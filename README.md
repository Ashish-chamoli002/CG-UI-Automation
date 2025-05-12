# CoverGo QA Automation Suite

This repository contains end-to-end tests written using [Playwright](https://playwright.dev/) and TypeScript.
It tests flows such as registration, login, cart actions, product filtering, and checkout on [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com).

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/covergo-playwright-tests.git
cd covergo-playwright-tests
```

### 2. Install Dependencies

```bash
npm install
npx playwright install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root:

```env
COVERGO_EMAIL=your_email@example.com
COVERGO_PASSWORD=your_secure_password
```



---

##  Running the Tests

Run all tests:

```bash
npm run test
```

Run a specific test:

```bash
npx playwright test tests/your-test-file.spec.ts
```

---

## 📊 Viewing HTML Reports

After running tests, view the report:

```bash
npm run report
```

This opens the generated HTML report from the `playwright-report/` directory.


---

## 🗂️ Project Structure

```
.
├── tests/                   # Test specs
├── support/pages/          # Page Object Models (POM)
├── .env                    # Environment config (not checked in)
├── playwright.config.ts    # Playwright setup
├── README.md
```



## 👨‍💻 Author

**Ashish Chamoli**
[LinkedIn →](https://www.linkedin.com/in/ashish-chamoliqa/)

---
