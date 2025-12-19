#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
}

const checks = []
let hasErrors = false
let hasWarnings = false

function addCheck(name, status, message = '') {
  checks.push({ name, status, message })
  if (status === 'error') hasErrors = true
  if (status === 'warning') hasWarnings = true
}

function runCommand(command, silent = true) {
  try {
    const output = execSync(command, { 
      stdio: silent ? 'pipe' : 'inherit',
      encoding: 'utf8'
    })
    return { success: true, output }
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout }
  }
}

async function runChecks() {
  console.log(`${colors.blue}🚀 Pre-Deployment Checklist${colors.reset}`)
  console.log('============================\n')
  
  // 1. Check Node version
  console.log('Checking Node.js version...')
  const nodeVersion = process.version
  const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1))
  if (majorVersion >= 18) {
    addCheck('Node.js Version', 'success', nodeVersion)
  } else {
    addCheck('Node.js Version', 'error', `${nodeVersion} (requires v18+)`)
  }
  
  // 2. Check for .env.local
  console.log('Checking environment configuration...')
  if (fs.existsSync('.env.local')) {
    const envContent = fs.readFileSync('.env.local', 'utf8')
    const hasProjectId = envContent.includes('NEXT_PUBLIC_SANITY_PROJECT_ID=')
    const hasDataset = envContent.includes('NEXT_PUBLIC_SANITY_DATASET=')
    
    if (hasProjectId && hasDataset) {
      addCheck('Environment Variables', 'success', 'Configured')
    } else {
      addCheck('Environment Variables', 'error', 'Missing Sanity configuration')
    }
  } else {
    addCheck('Environment Variables', 'error', '.env.local not found')
  }
  
  // 3. Run TypeScript check
  console.log('Running TypeScript check...')
  const tscResult = runCommand('npx tsc --noEmit')
  if (tscResult.success) {
    addCheck('TypeScript', 'success', 'No type errors')
  } else {
    const errorCount = (tscResult.output?.match(/error TS/g) || []).length
    addCheck('TypeScript', 'error', `${errorCount} type error(s) found`)
  }
  
  // 4. Run ESLint
  console.log('Running ESLint...')
  const lintResult = runCommand('npm run lint')
  if (lintResult.success) {
    addCheck('ESLint', 'success', 'No linting errors')
  } else {
    addCheck('ESLint', 'warning', 'Linting issues found')
  }
  
  // 5. Test build
  console.log('Testing production build...')
  const buildResult = runCommand('npm run build')
  if (buildResult.success) {
    addCheck('Production Build', 'success', 'Build successful')
    
    // Check build size
    const buildDir = '.next'
    if (fs.existsSync(buildDir)) {
      const getDirSize = (dir) => {
        let size = 0
        const files = fs.readdirSync(dir)
        files.forEach(file => {
          const filePath = path.join(dir, file)
          const stats = fs.statSync(filePath)
          if (stats.isDirectory()) {
            size += getDirSize(filePath)
          } else {
            size += stats.size
          }
        })
        return size
      }
      
      const buildSize = getDirSize(buildDir) / (1024 * 1024)
      if (buildSize > 100) {
        addCheck('Build Size', 'warning', `${buildSize.toFixed(2)}MB (large)`)
      } else {
        addCheck('Build Size', 'success', `${buildSize.toFixed(2)}MB`)
      }
    }
  } else {
    addCheck('Production Build', 'error', 'Build failed')
  }
  
  // 6. Check for console.log statements
  console.log('Checking for console statements...')
  const jsFiles = execSync('find src -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" 2>/dev/null || true', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean)
  
  let consoleCount = 0
  jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      const matches = content.match(/console\.(log|error|warn|info|debug)/g)
      if (matches) consoleCount += matches.length
    }
  })
  
  if (consoleCount > 0) {
    addCheck('Console Statements', 'warning', `${consoleCount} found (remove for production)`)
  } else {
    addCheck('Console Statements', 'success', 'None found')
  }
  
  // 7. Check package vulnerabilities
  console.log('Checking for vulnerabilities...')
  const auditResult = runCommand('npm audit --json')
  if (auditResult.output) {
    try {
      const audit = JSON.parse(auditResult.output)
      const vulns = audit.metadata?.vulnerabilities || {}
      const critical = vulns.critical || 0
      const high = vulns.high || 0
      
      if (critical > 0 || high > 0) {
        addCheck('Security', 'error', `${critical} critical, ${high} high vulnerabilities`)
      } else if (vulns.moderate > 0 || vulns.low > 0) {
        addCheck('Security', 'warning', `${vulns.moderate || 0} moderate, ${vulns.low || 0} low vulnerabilities`)
      } else {
        addCheck('Security', 'success', 'No vulnerabilities')
      }
    } catch {
      addCheck('Security', 'warning', 'Could not parse audit results')
    }
  }
  
  // 8. Check for TODO comments
  console.log('Checking for TODO comments...')
  let todoCount = 0
  jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      const matches = content.match(/TODO|FIXME|HACK|XXX/gi)
      if (matches) todoCount += matches.length
    }
  })
  
  if (todoCount > 0) {
    addCheck('TODO Comments', 'warning', `${todoCount} found`)
  } else {
    addCheck('TODO Comments', 'success', 'None found')
  }
  
  // 9. Check Git status
  console.log('Checking Git status...')
  const gitStatus = runCommand('git status --porcelain')
  if (gitStatus.output && gitStatus.output.trim()) {
    const changes = gitStatus.output.trim().split('\n').length
    addCheck('Git Status', 'warning', `${changes} uncommitted change(s)`)
  } else {
    addCheck('Git Status', 'success', 'Clean working directory')
  }
  
  // 10. Verify Sanity content
  console.log('Checking Sanity content...')
  const contentCheck = runCommand('node scripts/check-content.js')
  if (contentCheck.success) {
    addCheck('Sanity Content', 'success', 'Content verified')
  } else {
    addCheck('Sanity Content', 'warning', 'Could not verify content')
  }
  
  // 11. Check for sensitive data
  console.log('Checking for sensitive data...')
  let sensitiveFound = false
  const sensitivePatterns = [
    /api[_-]?key/i,
    /secret/i,
    /password/i,
    /token/i,
    /private[_-]?key/i
  ]
  
  jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      sensitivePatterns.forEach(pattern => {
        if (pattern.test(content)) {
          // Check if it's not in a comment or type definition
          const lines = content.split('\n')
          lines.forEach(line => {
            if (pattern.test(line) && !line.trim().startsWith('//') && !line.includes('interface') && !line.includes('type ')) {
              sensitiveFound = true
            }
          })
        }
      })
    }
  })
  
  if (sensitiveFound) {
    addCheck('Sensitive Data', 'warning', 'Potential sensitive data in code')
  } else {
    addCheck('Sensitive Data', 'success', 'No hardcoded secrets found')
  }
  
  // Print results
  console.log('\n' + '='.repeat(50))
  console.log(`${colors.blue}📋 Deployment Readiness Report${colors.reset}`)
  console.log('='.repeat(50) + '\n')
  
  checks.forEach(check => {
    let icon = '✅'
    let color = colors.green
    
    if (check.status === 'warning') {
      icon = '⚠️ '
      color = colors.yellow
    } else if (check.status === 'error') {
      icon = '❌'
      color = colors.red
    }
    
    console.log(`${icon} ${color}${check.name}${colors.reset}`)
    if (check.message) {
      console.log(`   ${check.message}`)
    }
  })
  
  // Summary
  console.log('\n' + '='.repeat(50))
  
  if (hasErrors) {
    console.log(`\n${colors.red}❌ DEPLOYMENT BLOCKED${colors.reset}`)
    console.log('Critical issues must be resolved before deployment.\n')
    console.log('Fix the errors above and run this check again.')
    process.exit(1)
  } else if (hasWarnings) {
    console.log(`\n${colors.yellow}⚠️  READY WITH WARNINGS${colors.reset}`)
    console.log('Deployment possible but consider addressing warnings.\n')
    console.log('Review the warnings above before proceeding.')
    process.exit(0)
  } else {
    console.log(`\n${colors.green}✅ READY FOR DEPLOYMENT${colors.reset}`)
    console.log('All checks passed! Your app is ready to deploy.\n')
    console.log('Next steps:')
    console.log('1. Run: git push origin main')
    console.log('2. Deploy via Vercel/Netlify/your platform')
    console.log('3. Run post-deployment verification')
    process.exit(0)
  }
}

// Run checks
runChecks().catch(error => {
  console.error(`${colors.red}Error running checks:${colors.reset}`, error.message)
  process.exit(1)
})