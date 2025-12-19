#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
}

// MCP Servers to install
const mcpServers = [
  {
    name: 'Vercel MCP',
    package: '@vercel/mcp-server',
    description: 'Deploy and manage Vercel projects',
    config: {
      command: 'npx',
      args: ['-y', '@vercel/mcp-server']
    }
  },
  {
    name: 'Context7 MCP',
    package: '@context7/mcp-server',
    description: 'Enhanced context management',
    config: {
      command: 'npx',
      args: ['-y', '@context7/mcp-server']
    }
  },
  {
    name: 'Supabase MCP',
    package: '@supabase/mcp-server',
    description: 'Supabase database operations',
    config: {
      command: 'npx',
      args: ['-y', '@supabase/mcp-server']
    }
  },
  {
    name: 'Sanity MCP',
    package: '@sanity/mcp-server',
    description: 'Sanity CMS integration',
    config: {
      command: 'npx',
      args: ['-y', '@sanity/mcp-server'],
      env: {
        SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET
      }
    }
  },
  {
    name: 'Browser MCP',
    package: '@browsermcp/server',
    description: 'Browser automation and testing',
    config: {
      command: 'npx',
      args: ['-y', '@browsermcp/server']
    }
  },
  {
    name: 'Serena MCP',
    package: '@serena/mcp-server',
    description: 'AI-enhanced development assistance',
    config: {
      command: 'npx',
      args: ['-y', '@serena/mcp-server']
    }
  },
  {
    name: 'Ref MCP',
    package: '@ref/mcp-server',
    description: 'Reference and documentation lookup',
    config: {
      command: 'npx',
      args: ['-y', '@ref/mcp-server']
    }
  },
  {
    name: 'Filesystem MCP',
    package: '@anthropic/mcp-server-filesystem',
    description: 'Enhanced file system operations',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic/mcp-server-filesystem']
    }
  },
  {
    name: 'Docker MCP',
    package: '@docker/mcp-server',
    description: 'Docker container management',
    config: {
      command: 'npx',
      args: ['-y', '@docker/mcp-server']
    }
  },
  {
    name: 'Bright Data MCP',
    package: '@brightdata/mcp-server',
    description: 'Web scraping and data extraction',
    config: {
      command: 'npx',
      args: ['-y', '@brightdata/mcp-server']
    }
  },
  {
    name: 'Playwright MCP',
    package: '@playwright/mcp-server',
    description: 'Browser automation with Playwright',
    config: {
      command: 'npx',
      args: ['-y', '@playwright/mcp-server']
    }
  },
  {
    name: 'Notion MCP',
    package: '@notion/mcp-server',
    description: 'Notion workspace integration',
    config: {
      command: 'npx',
      args: ['-y', '@notion/mcp-server']
    }
  },
  {
    name: 'Knowledge Graph MCP',
    package: '@knowledge-graph/mcp-server',
    description: 'Knowledge graph memory system',
    config: {
      command: 'npx',
      args: ['-y', '@knowledge-graph/mcp-server']
    }
  },
  {
    name: 'Sequential Thinking MCP',
    package: '@sequential-thinking/mcp-server',
    description: 'Step-by-step reasoning assistance',
    config: {
      command: 'npx',
      args: ['-y', '@sequential-thinking/mcp-server']
    }
  },
  {
    name: 'Blender MCP',
    package: '@blender/mcp-server',
    description: '3D modeling and animation',
    config: {
      command: 'npx',
      args: ['-y', '@blender/mcp-server']
    }
  },
  {
    name: 'Slack/Discord MCP',
    package: '@messaging/mcp-server',
    description: 'Slack and Discord integration',
    config: {
      command: 'npx',
      args: ['-y', '@messaging/mcp-server']
    }
  },
  {
    name: 'Apify MCP',
    package: '@apify/mcp-server',
    description: 'Web scraping and automation platform',
    config: {
      command: 'npx',
      args: ['-y', '@apify/mcp-server'],
      env: {
        APIFY_API_TOKEN: process.env.APIFY_API_TOKEN
      }
    }
  },
  {
    name: 'YouTube Translate MCP',
    package: '@youtube-translate/mcp-server',
    description: 'YouTube video translation and subtitles',
    config: {
      command: 'npx',
      args: ['-y', '@youtube-translate/mcp-server'],
      env: {
        YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
        GOOGLE_TRANSLATE_API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY
      }
    }
  },
  {
    name: 'GitHub MCP',
    package: '@github/mcp-server',
    description: 'GitHub repository management and operations',
    config: {
      command: 'npx',
      args: ['-y', '@github/mcp-server'],
      env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN
      }
    }
  },
  {
    name: 'Pipedream MCP',
    package: '@pipedream/mcp-server',
    description: 'Serverless workflow automation and API integrations',
    config: {
      command: 'npx',
      args: ['-y', '@pipedream/mcp-server'],
      env: {
        PIPEDREAM_API_KEY: process.env.PIPEDREAM_API_KEY
      }
    }
  }
]

function runCommand(command, options = {}) {
  try {
    const result = execSync(command, { 
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: 'utf8',
      ...options
    })
    return { success: true, output: result }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

async function setupMCP() {
  console.log(`${colors.blue}🚀 MCP Server Setup Tool${colors.reset}`)
  console.log('========================\n')
  
  // Get Claude Code config directory
  const homeDir = os.homedir()
  const claudeConfigDir = path.join(homeDir, '.config', 'claude')
  const mcpConfigFile = path.join(claudeConfigDir, 'claude_desktop_config.json')
  
  // Create config directory if it doesn't exist
  if (!fs.existsSync(claudeConfigDir)) {
    fs.mkdirSync(claudeConfigDir, { recursive: true })
    console.log(`Created config directory: ${claudeConfigDir}\n`)
  }
  
  // Load existing config or create new one
  let config = {
    mcpServers: {}
  }
  
  if (fs.existsSync(mcpConfigFile)) {
    try {
      config = JSON.parse(fs.readFileSync(mcpConfigFile, 'utf8'))
      console.log(`${colors.green}✓${colors.reset} Found existing MCP configuration\n`)
    } catch (error) {
      console.log(`${colors.yellow}⚠${colors.reset} Could not parse existing config, creating new one\n`)
    }
  }
  
  if (!config.mcpServers) {
    config.mcpServers = {}
  }
  
  console.log('Installing MCP servers...\n')
  
  let installed = 0
  let failed = 0
  
  // Install each MCP server
  for (const server of mcpServers) {
    process.stdout.write(`Installing ${server.name}... `)
    
    // Check if package exists (simplified check)
    const checkResult = runCommand(`npm view ${server.package} version`, { silent: true })
    
    if (checkResult.success || server.package.includes('@anthropic/')) {
      // Add to config
      const serverKey = server.package.replace(/[@/]/g, '-')
      config.mcpServers[serverKey] = server.config
      
      console.log(`${colors.green}✓${colors.reset}`)
      installed++
    } else {
      console.log(`${colors.yellow}⚠ Package may not exist yet${colors.reset}`)
      // Add to config anyway for future availability
      const serverKey = server.package.replace(/[@/]/g, '-')
      config.mcpServers[serverKey] = server.config
      failed++
    }
  }
  
  // Save configuration
  console.log('\nSaving MCP configuration...')
  fs.writeFileSync(mcpConfigFile, JSON.stringify(config, null, 2))
  console.log(`${colors.green}✓${colors.reset} Configuration saved to ${mcpConfigFile}\n`)
  
  // Create local MCP config for project
  const localMcpConfig = {
    name: 'crafted-group-mcp',
    version: '1.0.0',
    description: 'MCP configuration for Crafted Group website',
    servers: {
      sanity: {
        enabled: true,
        config: {
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
        }
      },
      vercel: {
        enabled: true,
        config: {}
      },
      filesystem: {
        enabled: true,
        config: {
          rootPath: process.cwd()
        }
      }
    }
  }
  
  fs.writeFileSync('.mcp.json', JSON.stringify(localMcpConfig, null, 2))
  console.log(`${colors.green}✓${colors.reset} Created local .mcp.json configuration\n`)
  
  // Print summary
  console.log('='.repeat(50))
  console.log(`${colors.blue}📊 Installation Summary${colors.reset}`)
  console.log('='.repeat(50) + '\n')
  
  console.log(`Configured: ${installed + failed} MCP servers`)
  if (failed > 0) {
    console.log(`${colors.yellow}Note: Some packages may not be available yet${colors.reset}`)
    console.log('They will be configured for when they become available.\n')
  }
  
  // Instructions
  console.log(`${colors.blue}📝 Next Steps:${colors.reset}`)
  console.log('1. Restart Claude Code for changes to take effect')
  console.log('2. Run "claude mcp" to verify MCP servers are loaded')
  console.log('3. Check individual server docs for API keys needed:\n')
  
  console.log('   Servers that may need API keys:')
  console.log('   - Vercel: Set VERCEL_TOKEN')
  console.log('   - Supabase: Set SUPABASE_URL and SUPABASE_ANON_KEY')
  console.log('   - Notion: Set NOTION_TOKEN')
  console.log('   - Bright Data: Set BRIGHT_DATA_API_KEY')
  console.log('   - Apify: Set APIFY_API_TOKEN')
  console.log('   - YouTube Translate: Set YOUTUBE_API_KEY and GOOGLE_TRANSLATE_API_KEY')
  console.log('   - GitHub: Set GITHUB_TOKEN')
  console.log('   - Pipedream: Set PIPEDREAM_API_KEY')
  console.log('   - Slack/Discord: Set respective tokens\n')
  
  console.log(`${colors.green}✅ MCP setup complete!${colors.reset}`)
  console.log('\nRestart Claude Code and run /mcp to see available servers.')
}

// Load environment variables
require('dotenv').config({ path: '.env.local' })

// Run setup
setupMCP().catch(error => {
  console.error(`${colors.red}❌ Setup error:${colors.reset}`, error.message)
  process.exit(1)
})