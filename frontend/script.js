document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu li");
  const content = document.getElementById("content");

  const sections = {
    home: `
      <section class="hero">
  <h1>SMS Spam Detection using Machine Learning</h1>
  <p class="intro">
    This project demonstrates how machine learning can be applied to classify SMS messages 
    as either Spam or Ham (legitimate). By analyzing thousands of text messages, 
    performing exploratory data analysis, and evaluating multiple models, 
    we built a system that can automatically detect unwanted messages.
  </p>

  <!-- Workflow Overview -->
  <div class="workflow">
    <h2>Project Workflow</h2>
    <ul class="steps">
      <li>📂 Data Collection</li>
      <li>🧹 Data Cleaning</li>
      <li>📊 Exploratory Data Analysis</li>
      <li>🔤 Text Preprocessing</li>
      <li>🤖 Model Training</li>
      <li>📈 Evaluation</li>
      <li>⚡ Live Prediction</li>
    </ul>
  </div>

  <!-- Spam Image -->
  <div class="image-block">
    <img src="assets/spam.webp" alt="Spam">
  </div>
</section>

    `,
    eda: `
      <section>
  <h2>Exploratory Data Analysis</h2>

  <!-- Spam vs Ham Distribution -->
  <div class="card">
    <h3>Spam vs Ham Distribution</h3>
    <img src="assets/spam_vs_ham.png" alt="Spam vs Ham Distribution">
    <p>
      We found that <strong>76% of messages are Ham</strong> and only 24% are Spam. 
      This imbalance means accuracy alone is not a reliable metric for evaluation.
    </p>
  </div>

  <!-- Message Length Distribution -->
  <div class="card">
    <h3>Message Length Distribution</h3>
    <img src="assets/message_length_distribution.png" alt="Message Length Distribution" width="700">
    <p>
      In giving dataset. Ham messages tend to be <strong>longer</strong> than Spam messages.
    </p>
  </div>

  <!-- Word Count Distribution -->
  <div class="card">
    <h3>Message Word Counts</h3>
    <img src="assets/message_word_distribution.png" alt="Word Count Distribution">
    <p>
      Ham messages tend to be longer than Spam messages in the dataset, indicating that they are generally more detailed and expressive.
    </p>
  </div>
</section>

    `,
    preprocessing: `
<section>
  <h2>Text Preprocessing</h2>

  <!-- Transformation Strategy -->
  <div class="card">
    <h3>Transformation Strategy</h3>
    <pre class="code-block">
def transform_text(text):
    # 1️⃣ Convert text to lowercase
    text = text.lower()
    
    # 2️⃣ Tokenize text into words
    text = nltk.word_tokenize(text)
    
    y = []
    
    # 3️⃣ Keep only alphanumeric words
    for i in text:
        if i.isalnum():
            y.append(i)
    
    text = y[:]
    y.clear()
    
    # 4️⃣ Remove stopwords and punctuation
    for i in text:
        if i not in stopwords.words('english') and i not in string.punctuation:
            y.append(i)
            
    text = y[:]
    y.clear()
    
    # 5️⃣ Apply stemming
    for i in text:
        y.append(ps.stem(i))
    
    # 6️⃣ Join back into string
    return " ".join(y)
    </pre>
    <p>After transformation, text was vectorized using <strong>TF-IDF Vectorizer</strong>.</p>
  </div>

  <!-- Example Transformation -->
  <div class="card">
    <h3>Example Transformation</h3>
    <p><strong>Original SMS:</strong> "Congratulations! You have won a FREE ticket. Call now to claim your prize."</p>
    <p><strong>After transform_text:</strong> "congratul win free ticket call claim prize"</p>
    <p><strong>After TF-IDF Vectorizer:</strong></p>
    <pre class="code-block">
{
  "congratul": 0.42,
  "win": 0.58,
  "free": 0.67,
  "ticket": 0.33,
  "call": 0.29,
  "claim": 0.36,
  "prize": 0.55
}
    </pre>
    <p>This shows how raw text is cleaned, normalized, and converted into numerical features for machine learning.</p>
  </div>

  <!-- WordClouds -->
  <div class="card wordclouds">
    <h3>WordClouds</h3>
    <div class="wc-container">
      <div>
        <h4>Ham Messages</h4>
        <img src="assets/ham_wordcloud.png" alt="Ham WordCloud">
      </div>
      <div>
        <h4>Spam Messages</h4>
        <img src="assets/spam_wordcloud.png" alt="Spam WordCloud">
      </div>
    </div>
  </div>

  <!-- Top 30 Words: Ham -->
  <div class="card">
    <h3>Top 30 Words — Ham</h3>
    <img src="assets/ham_top30_barplot.png" alt="Top 30 Ham Words">
    <p>
      The most frequent words in Ham messages reflect everyday communication, 
      often short and casual.
    </p>
  </div>

  <!-- Top 30 Words: Spam -->
  <div class="card">
    <h3>Top 30 Words — Spam</h3>
    <img src="assets/spam_top30_barplot.png" alt="Top 30 Spam Words">
    <p>
      Spam messages frequently use promotional and persuasive words, 
      highlighting offers, prizes, and urgency.
    </p>
  </div>
</section>

    `,
    evaluation: `
<section>
  <h2>Model Evaluation</h2>

  <!-- Intro -->
  <p>
    In spam filtering, <strong>precision</strong> is the most critical metric because we want to minimize 
    false positives (legitimate messages incorrectly flagged as spam). Below are the evaluation results 
    for multiple algorithms tested on the dataset.
  </p>

  <!-- Performance Table -->
<!-- Performance Table -->
<div class="card">
  <h3>Individual Model Performance</h3>
  <table class="eval-table">
    <thead>
      <tr>
        <th>Algorithm</th>
        <th>Accuracy</th>
        <th>Precision</th>
        <th>Recall</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Multinomial NB</td><td>0.982441</td><td>0.996324</td><td>0.934483</td></tr>
      <tr><td>SVC</td><td>0.990342</td><td>0.992933</td><td>0.968966</td></tr>
      <tr><td>Logistic Regression</td><td>0.974539</td><td>0.974545</td><td>0.924138</td></tr>
      <tr><td>Random Forest</td><td>0.978929</td><td>0.968310</td><td>0.948276</td></tr>
      <tr><td>KNN</td><td>0.977173</td><td>0.958333</td><td>0.951724</td></tr>
      <tr><td>Bernoulli NB</td><td>0.957858</td><td>0.860119</td><td>0.996552</td></tr>
      <tr><td>Decision Tree</td><td>0.923617</td><td>0.804805</td><td>0.924138</td></tr>
    </tbody>
  </table>
  <p>
    From these results, the top-performing models are <strong>SVC, Multinomial NB, Random Forest, and KNN</strong>.
    Individually, <strong>SVC</strong> stands out with the highest accuracy of 99.03% and excellent precision and recall.
  </p>
</div>

  <!-- Bar Plot -->
  <div class="card">
    <h3>Performance Comparison</h3>
    <img src="assets/algorithm_performance.png" alt="Model Performance Comparison">
    <p>
      Bar plot comparing accuracy, precision, and recall across all algorithms.
    </p>
  </div>

  <!-- Voting Classifier -->
  <div class="card">
    <h3>Voting Classifier vs SVC</h3>
    <table class="eval-table">
      <thead>
        <tr>
          <th>Model</th>
          <th>Accuracy</th>
          <th>Precision</th>
          <th>Recall</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Voting Classifier</td><td>0.9920</td><td>0.9929</td><td>0.9758</td></tr>
        <tr><td>SVC</td><td>0.9903</td><td>0.9929</td><td>0.9689</td></tr>
      </tbody>
    </table>
    <img src="assets/model_performance_comparison.png" alt="Voting Classifier vs SVC">
    <p>
      The <strong>Voting Classifier</strong> combines the strengths of the top THREE models (MNB, LR , SVC). 
      It achieves <strong>99.29% precision</strong> like SVC, but also improves accuracy AND recall. 
      This makes it the final chosen model for deployment.
    </p>
  </div>

  <!-- Conclusion -->
  <p>
    <strong>Final Model Selected:</strong> Voting Classifier  
    <br>
    ✅ 99.29% Precision (critical for spam filtering)  
    ✅ Higher Accuracy than SVC 
    ✅ Better Recall, ensuring fewer spam messages are missed
  </p>
</section>

    `,
    predict: `
     <section>
  <h2>Live Spam Detector</h2>
  <div class="detector-card">
    <textarea id="smsInput" placeholder="Enter SMS text..."></textarea>
    <button id="predictBtn">Predict</button>
    <p id="result"></p>
  </div>
</section>

    `
  };


  // Load default section
  content.innerHTML = sections.home;

  // Navigation
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const section = item.getAttribute("data-section");
      content.innerHTML = sections[section];

      // Attach prediction logic only when "predict" section is loaded
      if (section === "predict") {
        const predictBtn = document.getElementById("predictBtn");
        const smsInput = document.getElementById("smsInput");
        const result = document.getElementById("result");

        predictBtn.addEventListener("click", async () => {
          const message = smsInput.value.trim();

          // Empty input check
          if (!message) {
            result.textContent = "Please enter a message ⚠️";
            result.style.opacity = 1;
            return;
          }

          // Reset UI
          result.classList.remove("result-ham", "result-spam");
          result.style.opacity = 0;
          result.textContent = "Analyzing...";

          try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ text: message })
            });

            if (!response.ok) {
              throw new Error("Server error");
            }

            const data = await response.json();
            const prediction = data.prediction?.toLowerCase();

            if (prediction === "spam") {
              result.textContent = "Spam 🚨";
              result.classList.add("result-spam");
            } else {
              result.textContent = "Not Spam ✅";
              result.classList.add("result-ham");
            }

            result.style.opacity = 1;

          } catch (error) {
            console.error("Error predicting:", error);
            result.textContent = "Error connecting to prediction API ❌";
            result.style.opacity = 1;
          }
        });
      }

    });
  });
});
