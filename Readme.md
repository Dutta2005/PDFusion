# 📄 PDFusion

Experience the most elegant way to merge PDF files. Effortlessly select specific pages, reorder with intuitive drag & drop, and generate flawless documents in seconds—all with a seamless and visually engaging interface.

## 🧪 Features

- 🔒 Sign in with Google authentication
- 🧲 Drag & drop PDF upload
- 🖼️ Visual page selection from each PDF
- 🌀 Reorder pages with intuitive drag & drop
- ⚡ Merge PDFs instantly with optimized file size
- ✅ High-quality merged output

## 🛠 Tech Stack

**Frontend:** Next.js, Shadcn UI, Typescript  
**Backend:** Next.js API Routes  
**Cloud Storage:** Cloudinary  

## 📦 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Dutta2005/PDFusion.git
   ```
2. Navigate to the project directory
   ```bash
   cd PDFusion
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Create a `.env` file and add your environment variables (see below)
5. Run the development server
   ```bash
   npm run dev
   ```

### 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
DATABASE_URL=your-supabase-database-url-here
DIRECT_URL=your-supabase-direct-url-here
```

## ⚙️ Usage / How it Works

1. Sign in securely using your Google account.
2. Drag & drop your PDF files or use the file picker to select them.
3. Visually select specific pages from each PDF, or choose all pages.
4. Reorder pages effortlessly with the drag & drop interface.
5. Click “Merge PDFs” to generate your optimized, high-quality merged PDF instantly.

## 🤝 Contributions

We welcome all contributions! Follow these steps to contribute:

1. 🍴 Fork this repository
2. 📥 Clone your fork using `git clone`
3. 📂 Create a new branch (`git checkout -b feature/your-feature-name`)
4. 🛠 Make your changes
5. ✅ Commit and push (`git commit -m "Add feature"`)
6. 🔁 Open a Pull Request with a clear description

## 🚧 Upcoming Features

- 📑 Support for more file formats (e.g., DOCX to PDF)
- ☁️ Integration with Google Drive & Dropbox
- 🔗 Batch processing for multiple merges
- 🎨 Advanced editing tools (annotations, watermarking)

## 📄 License

This project is licensed under the MIT License.

## 📬 Contact

**Author:** Raj Dutta  
**Email:** rdhack@gmail.com  
**LinkedIn:** [https://www.linkedin.com/in/rajdutta062005/](https://www.linkedin.com/in/rajdutta062005/)

> ❤️ This README was written by **[ReadmeEasy](https://readme-easy.vercel.app/)** for fast and professional documentation.