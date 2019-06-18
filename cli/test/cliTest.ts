import test from 'ava'
import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs';

test.before(t=>{
  t.notThrows(()=> execSync('npm run build', { stdio: 'pipe' }))
})

test('should render .png', async t => {
  t.false(existsSync('tmp/1/panda.png.svg'))
  const r = execSync('node bin/image-tracer.js --input test/assets/panda.png --output tmp/1 --debug', { stdio: 'pipe' })
  t.true(readFileSync('tmp/1/panda.png.svg').toString().includes('<svg'))
})

test('should render .jpg', async t => {
  t.false(existsSync('tmp/2/bluebells.jpg.svg'))
  const r = execSync('node bin/image-tracer.js --input test/assets/bluebells.jpg --output tmp/2 --debug', { stdio: 'pipe' })
  t.true(readFileSync('tmp/2/bluebells.jpg.svg').toString().includes('<svg'))
})

test('should support glob patterns', async t => {
  t.false(existsSync('tmp/3/bluebells.jpg.svg'))
  execSync('node bin/image-tracer.js --input "test/**/*.j*" --output tmp/3 --debug', { stdio: 'pipe' })
  t.true(readFileSync('tmp/3/bluebells.jpg.svg').toString().includes('<svg'))
})