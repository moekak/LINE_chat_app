<!DOCTYPE html>
<html lang="ja">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>アクセスできません</title>
      <style>
            * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
            }

            body {
                  font-family: 'Helvetica Neue', Arial, 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
                  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 20px;
            }

            .error-container {
                  max-width: 600px;
                  text-align: center;
                  background: white;
                  padding: 40px;
                  border-radius: 20px;
                  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            }

            .error-code {
                  font-size: 120px;
                  font-weight: 700;
                  color: #2d3748;
                  line-height: 1;
                  margin-bottom: 20px;
                  background: linear-gradient(45deg, #4299e1, #667eea);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text; /* モダンブラウザ対応 */
            }

            .error-title {
                  font-size: 24px;
                  color: #2d3748;
                  margin-bottom: 15px;
                  font-weight: 600;
            }

            .error-message {
                  color: #718096;
                  margin-bottom: 30px;
                  line-height: 1.6;
            }

            @media (max-width: 480px) {
                  .error-code {
                  font-size: 80px;
                  }

                  .error-title {
                  font-size: 20px;
                  }

                  .error-container {
                  padding: 30px;
                  margin: 0 15px;
                  }
            }
      </style>
</head>
<body>
      <div class="error-container">
            <h1 class="error-code">404</h1>
            <h2 class="error-title">ユーザーが見つかりません</h2>
            <p class="error-message">指定されたユーザーは存在しないか、アクセスできない可能性があります。</p>
      </div>
</body>
</html>