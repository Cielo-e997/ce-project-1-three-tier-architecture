const http = require('http');
const { execSync } = require('child_process');

function getInstanceId() {
  try {
    return execSync('curl -s http://169.254.169.254/latest/meta-data/instance-id').toString().trim();
  } catch {
    return 'unknown';
  }
}

function getAZ() {
  try {
    return execSync('curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone').toString().trim();
  } catch {
    return 'unknown';
  }
}

// Simulated DB status for now (lab placeholder)
function getDbStatus() {
  return 'simulated-ok';
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK');
  }

  const instanceId = getInstanceId();
  const az = getAZ();
  const db = getDbStatus();

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(
    `Hello from the App Tier!\n` +
    `Instance ID: ${instanceId}\n` +
    `Availability Zone: ${az}\n` +
    `Database status: ${db}\n` +
    `Health check: /health\n`
  );
});

server.listen(80, () => {
  console.log('Server listening on port 80');
});
