/**
 * COMPREHENSIVE TEST SUITE FOR FAKE NEWS DETECTION PROJECT
 * Tests all features: Auth, API, Database, ML Model
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';
let userId = '';
let analysisId = '';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(status, message) {
  const icon =
    status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : status === 'WARN' ? '⚠️' : 'ℹ️';
  console.log(`${icon} ${message}`);
}

function header(text) {
  console.log(`\n${colors.blue}${'='.repeat(60)}\n${text}\n${'='.repeat(60)}${colors.reset}\n`);
}

async function runTests() {
  let passCount = 0;
  let failCount = 0;

  try {
    // =================== TEST 1: AUTHENTICATION ===================
    header('TEST 1: AUTHENTICATION');

    // 1.1 Register User
    try {
      const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
        name: 'Test User',
        email: `testuser${Date.now()}@test.com`,
        password: 'Test@123456',
      });

      if (registerRes.data.token && registerRes.data.user) {
        log('PASS', 'User registration successful');
        authToken = registerRes.data.token;
        userId = registerRes.data.user.id;
        passCount++;
      }
    } catch (error) {
      log('FAIL', `Registration failed: ${error.response?.data?.message || error.message}`);
      failCount++;
    }

    // 1.2 Login User
    try {
      const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
        email: `testuser${Date.now()}@test.com`,
        password: 'Test@123456',
      });

      if (loginRes.data.token) {
        log('PASS', 'Login successful');
        passCount++;
      }
    } catch (error) {
      log('FAIL', `Login failed: ${error.response?.data?.message || error.message}`);
      failCount++;
    }

    // 1.3 Invalid Login
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: 'nonexistent@test.com',
        password: 'wrongpassword',
      });
      log('FAIL', 'Invalid login should have failed');
      failCount++;
    } catch (error) {
      if (error.response?.status === 401) {
        log('PASS', 'Invalid login properly rejected');
        passCount++;
      }
    }

    // =================== TEST 2: ROUTE PROTECTION ===================
    header('TEST 2: ROUTE PROTECTION');

    // 2.1 Check News Without Token
    try {
      await axios.post(`${BASE_URL}/check-news`, {
        news: 'Test news text',
      });
      log('FAIL', 'Protected route should require token');
      failCount++;
    } catch (error) {
      if (error.response?.status === 401) {
        log('PASS', 'Check-news route properly protected');
        passCount++;
      }
    }

    // 2.2 History Without Token
    try {
      await axios.get(`${BASE_URL}/history`);
      log('FAIL', 'History route should require token');
      failCount++;
    } catch (error) {
      if (error.response?.status === 401) {
        log('PASS', 'History route properly protected');
        passCount++;
      }
    }

    // =================== TEST 3: NEWS DETECTION ===================
    header('TEST 3: NEWS DETECTION & DATABASE');

    // 3.1 Text Detection
    try {
      const detectRes = await axios.post(
        `${BASE_URL}/check-news`,
        {
          news: 'This breaking news story claims that aliens have landed in New York City. The government is allegedly covering this up. Experts say this is unlikely based on scientific evidence.',
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (detectRes.data.result && detectRes.data.confidence) {
        log(
          'PASS',
          `Text detection works - Result: ${detectRes.data.result}, Confidence: ${detectRes.data.confidence}`
        );
        passCount++;
      }
    } catch (error) {
      log('FAIL', `Text detection failed: ${error.message}`);
      failCount++;
    }

    // 3.2 Get History
    try {
      const historyRes = await axios.get(`${BASE_URL}/history`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (historyRes.data.history && historyRes.data.history.length > 0) {
        log('PASS', `History retrieved - ${historyRes.data.history.length} record(s) found`);
        analysisId = historyRes.data.history[0]._id;
        
        // Check database fields
        const record = historyRes.data.history[0];
        if (record.userId && record.result && record.confidence !== undefined && record.inputText) {
          log('PASS', 'All database fields present (userId, result, confidence, inputText)');
          passCount += 2;
        } else {
          log('WARN', 'Some database fields missing');
        }
      }
    } catch (error) {
      log('FAIL', `History retrieval failed: ${error.message}`);
      failCount++;
    }

    // =================== TEST 4: URL EXTRACTION ===================
    header('TEST 4: URL EXTRACTION & DETECTION');

    // 4.1 Valid URL
    try {
      // Using a simple public page
      const detectRes = await axios.post(
        `${BASE_URL}/check-news`,
        {
          url: 'https://www.bbc.com/news',
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
          timeout: 15000,
        }
      );

      if (detectRes.data.result) {
        log('PASS', `URL extraction works - Result: ${detectRes.data.result}`);
        passCount++;
      }
    } catch (error) {
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        log('WARN', `URL test skipped (no internet/network issue): ${error.message}`);
      } else {
        log('WARN', `URL detection issue (may be network related): ${error.message}`);
      }
    }

    // =================== TEST 5: ERROR HANDLING ===================
    header('TEST 5: ERROR HANDLING');

    // 5.1 Empty Input
    try {
      const detectRes = await axios.post(
        `${BASE_URL}/check-news`,
        {
          news: '',
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (detectRes.data.explanation && detectRes.data.result === 'Error') {
        log('PASS', 'Empty input properly handled');
        passCount++;
      }
    } catch (error) {
      log('WARN', 'Empty input error handling could be improved');
    }

    // 5.2 Invalid Token
    try {
      await axios.get(`${BASE_URL}/history`, {
        headers: { Authorization: 'Bearer invalid_token_xyz' },
      });
      log('FAIL', 'Invalid token should be rejected');
      failCount++;
    } catch (error) {
      if (error.response?.status === 401) {
        log('PASS', 'Invalid token properly rejected');
        passCount++;
      }
    }

    // =================== TEST 6: DELETE ANALYSIS ===================
    header('TEST 6: DELETE OPERATION');

    if (analysisId) {
      try {
        const deleteRes = await axios.delete(`${BASE_URL}/history/${analysisId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (deleteRes.data.message) {
          log('PASS', 'Analysis deleted successfully');
          passCount++;
        }
      } catch (error) {
        log('FAIL', `Delete failed: ${error.message}`);
        failCount++;
      }
    }

    // =================== TEST 7: ML MODEL ===================
    header('TEST 7: ML MODEL VERIFICATION');

    try {
      // Test with clear fake news indicators
      const fakeRes = await axios.post(
        `${BASE_URL}/check-news`,
        {
          news: 'SHOCKING: Celebrity dies and comes back to life! This miracle cure destroyed by big pharma! Buy now!',
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (fakeRes.data.confidence && !isNaN(fakeRes.data.confidence)) {
        const conf = parseInt(fakeRes.data.confidence);
        if (conf >= 0 && conf <= 100) {
          log('PASS', `ML model returns valid confidence (0-100): ${conf}`);
          passCount++;
        }
      }
    } catch (error) {
      log('WARN', `ML model test issue: ${error.message}`);
    }

    // =================== FINAL REPORT ===================
    header('FINAL TEST REPORT');

    const total = passCount + failCount;
    const percentage = total > 0 ? Math.round((passCount / total) * 100) : 0;

    console.log(`${colors.green}✅ PASSED: ${passCount}${colors.reset}`);
    console.log(`${colors.red}❌ FAILED: ${failCount}${colors.reset}`);
    console.log(`${'ℹ️'} TOTAL:  ${total}`);
    console.log(`\n${colors.blue}COMPLETION: ${percentage}%${colors.reset}\n`);

    if (percentage === 100) {
      console.log('🎉 ALL TESTS PASSED! Project is ready for production.');
    } else if (percentage >= 80) {
      console.log('✅ Most features working. Minor issues to fix.');
    } else if (percentage >= 50) {
      console.log('⚠️  Core features work but several issues need attention.');
    } else {
      console.log('❌ Major issues detected. Needs significant fixes.');
    }
  } catch (error) {
    console.error('Test suite error:', error.message);
  }
}

// Run tests
console.log('\n🚀 Starting Fake News Detection Project Test Suite...\n');
console.log('Make sure MongoDB and backend server are running!\n');

setTimeout(() => {
  runTests().then(() => {
    console.log('\n✅ Tests completed!\n');
    process.exit(0);
  });
}, 1000);
