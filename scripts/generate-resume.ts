#!/usr/bin/env tsx
import { execSync } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'

// Check if LaTeX compiler is available
function findLaTeXCompiler(): string | null {
  try {
    execSync('lualatex --version', { stdio: 'ignore' })
    // Check if luaotfload is available for fontspec
    execSync('kpsewhich luaotfload-main.lua', { stdio: 'ignore' })
    return 'lualatex'
  } catch {}

  try {
    execSync('pdflatex --version', { stdio: 'ignore' })
    return 'pdflatex'
  } catch {}

  return null
}

// Build the resume
function buildResume() {
  const projectRoot = path.resolve(import.meta.dirname, '..')
  const resumesDir = path.join(projectRoot, 'resumes')
  const outputDir = path.join(projectRoot, 'public', 'resumes')
  const texFile = path.join(resumesDir, 'resume.tex')
  const outputPdf = path.join(outputDir, 'resume.pdf')

  if (!existsSync(texFile)) {
    throw new Error(`Resume file not found: ${texFile}`)
  }

  const compiler = findLaTeXCompiler()
  if (!compiler) {
    throw new Error(
      'No LaTeX compiler found. Install TeX Live: sudo apt install texlive-latex-extra texlive-fonts-extra',
    )
  }

  console.log(`Using: ${compiler}`)

  // Run compilation in the resumes directory
  execSync(
    `${compiler} -interaction=nonstopmode -halt-on-error -output-directory="${outputDir}" resume.tex`,
    {
      cwd: resumesDir,
      stdio: 'inherit',
    },
  )

  // Clean up auxiliary files
  const auxFiles = ['resume.aux', 'resume.log', 'resume.out']
  auxFiles.forEach((file) => {
    const auxPath = path.join(outputDir, file)
    if (existsSync(auxPath)) {
      execSync(`rm "${auxPath}"`)
    }
  })

  console.log(`Resume built: ${outputPdf}`)
}

// Main
try {
  buildResume()
} catch (error) {
  console.error(
    'Error:',
    error instanceof Error ? error.message : String(error),
  )
  process.exit(1)
}
