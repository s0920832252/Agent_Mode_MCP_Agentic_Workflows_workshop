# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以實際操作 GitHub Copilot Agent Mode、MCP 與 agentic workflow 為主軸，完成一個可直接在瀏覽器使用的純前端待辦清單。

## 線上展示

[GitHub Pages](https://citychen.github.io/Agent_Mode_MCP_Agentic_Workflows_workshop/)

> 請將網址中的 `<你的帳號>` 與 `<你的repo名稱>` 替換成實際的 GitHub 帳號與儲存庫名稱。

## 功能

- 新增待辦事項。
- 自動去除輸入內容前後的空白，空白內容不會被新增。
- 使用核取方塊切換待辦事項的完成狀態。
- 已完成的待辦事項會以刪除線與淡化樣式呈現。
- 刪除單筆待辦事項。
- 依「全部」、「未完成」或「已完成」篩選待辦事項。
- 顯示目前未完成的待辦事項數量。
- 清單為空時，依目前篩選條件顯示對應提示訊息。
- 待辦事項與主題偏好會保存在瀏覽器的 `localStorage` 中，重新載入頁面後仍可保留。
- 支援淺色與深色模式切換，尚未手動選擇時會跟隨作業系統的顯示偏好。
- 具備基本的鍵盤操作與 ARIA 屬性，互動控制項可使用鍵盤操作。
- 具備手機版響應式版面，適合在不同螢幕尺寸使用。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript 開發。
- 不使用任何前端框架或外部套件。
- 不依賴外部 CDN，專案可以離線運作。
- 使用 `localStorage` 保存待辦事項資料與主題設定。
- 使用原生 DOM API 建立與更新待辦清單畫面。
- 透過 CSS 變數管理顏色與主題樣式，並以媒體查詢處理系統深色模式與手機版版面。

## 開發方式

這個專案是在 GitHub Copilot 實戰工作坊中，透過 GitHub Copilot Agent Mode、MCP 與 `.github/prompts` 的 agentic workflow 完成：

- 使用 GitHub Copilot Agent Mode 協助理解需求、檢視專案內容、規劃修改範圍與完成程式實作。
- 透過 MCP 連接 GitHub 與 Microsoft Learn 等工具，讓工作流程可以讀取 GitHub 工作項目並查詢相關文件資源。
- 使用 `.github/prompts` 定義可重複執行的工作流程，例如讀取 issue、等待確認、修正指定問題、驗證結果，以及建立 Pull Request。
- 遵循專案規則，維持純前端架構與固定的 `index.html`、`styles.css`、`app.js` 檔案結構。
- 以瀏覽器中的實際操作作為功能驗證方式，確認待辦事項新增、狀態切換、篩選、刪除與資料保存行為。

## 我學到什麼

- 如何使用 GitHub Copilot Agent Mode 將需求拆解成可執行的開發步驟。
- 如何透過 MCP 讓 AI 工作流程與 GitHub 及文件資源互動。
- 如何使用 `.github/prompts` 建立具備明確順序與確認節點的 agentic workflow。
- 如何在不使用框架的情況下，以原生 JavaScript 管理 DOM、事件與 `localStorage` 資料。
- 如何在功能完成後，透過瀏覽器操作驗證使用者流程與介面行為。
