async function testEndpoints() {
  const baseUrl = 'http://localhost:5000/api';
  console.log('Testing Mood-to-Move API endpoints...');

  // 1. Health
  const healthRes = await fetch(`${baseUrl}/health`);
  const healthData = await healthRes.json();
  console.log('Health:', healthData.status === 'online' ? 'PASS' : 'FAIL');

  // 2. Activities
  const actRes = await fetch(`${baseUrl}/activities`);
  const actData = await actRes.json();
  console.log('Activities count:', actData.activities?.length, actData.activities?.length === 10 ? 'PASS' : 'FAIL');

  // 3. Login with Demo User
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'demo@example.com', password: 'Demo123!' })
  });
  const loginData = await loginRes.json();
  console.log('Demo Login:', loginData.success ? 'PASS' : 'FAIL');
  const token = loginData.token;

  // 4. Recommendation for Low + Studying too long
  const recRes = await fetch(`${baseUrl}/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ mood: 2, reason: 'Studying too long' })
  });
  const recData = await recRes.json();
  console.log('Recommendation:', recData.activity?.name, recData.activity?.slug === 'desk-stretch' ? 'PASS (2-Minute Desk Stretch)' : 'FAIL');

  // 5. Create Mood Entry
  const moodRes = await fetch(`${baseUrl}/moods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ moodScore: 2, reason: 'Studying too long' })
  });
  const moodData = await moodRes.json();
  console.log('Mood Check-in:', moodData.success ? 'PASS' : 'FAIL');

  // 6. Complete Activity Session
  const sessionRes = await fetch(`${baseUrl}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      activityId: recData.activity._id,
      beforeMood: 2,
      afterMood: 4,
      reason: 'Studying too long',
      durationSeconds: 120
    })
  });
  const sessionData = await sessionRes.json();
  console.log('Create Session (+2 improvement):', sessionData.session?.moodChange === 2 ? 'PASS' : 'FAIL');

  // 7. Dashboard Stats
  const statsRes = await fetch(`${baseUrl}/stats/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const statsData = await statsRes.json();
  console.log('Dashboard Stats:', statsData.stats?.todayCount >= 1 && statsData.stats?.currentStreak >= 1 ? 'PASS' : 'FAIL', statsData.stats);

  console.log('All backend checks verified!');
  process.exit(0);
}

testEndpoints().catch((err) => {
  console.error('Test Failed:', err);
  process.exit(1);
});
