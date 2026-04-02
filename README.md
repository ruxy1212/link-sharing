# DevLinks

A modern, interactive link management application built with Next.js, React, and Firebase.

### 🔗 Check it out 

[https://devlinks-go.vercel.app](https://devlinks-go.vercel.app)

![Screenshot_20250601-232431](https://github.com/user-attachments/assets/b01cf6c8-75a5-497d-bea2-dd7b66bdc7e6)

## 🚀 Features

- Beautiful and responsive UI with 3D animations
- Drag and drop link management
- Dark/Light theme support
- Firebase integration for authentication and data storage
- Real-time updates
- Customizable link categories
- Interactive 3D visualizations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18
- **UI Framework**: Material-UI (MUI) 5
- **3D Visualizations**: React Three Fiber, Three.js
- **Animations**: Framer Motion, GSAP
- **State Management**: React Context
- **Authentication & Database**: Firebase
- **Drag & Drop**: React DnD
- **Theme Management**: Next-themes
- **Type Safety**: TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ruxy1212/link-sharing.git
cd devlinks
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file with your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and Next.js communities for their amazing tools and support
- Firebase for providing the backend infrastructure
- Frontendmentor for the task challenge
- Gratitude to all contributors who have helped improve this project

## 📫 Contact

Project Link: [https://github.com/ruxy1212/link-sharing/issues](https://github.com/ruxy1212/link-sharing/issues)

## 📋 TODO

- Add more customization options
- Implement link analytics
- Add support for custom link icons
- Improve error handling
- Add more 3D visualization options

## 🎨 Color Reference

| Color             | Hex                                                                |
|-------------------|--------------------------------------------------------------------|
| Primary           | <span style="background-color: #0070f3; padding: 0 10px;">&nbsp;</span> `#0070f3` |
| Secondary         | <span style="background-color: #2083ff; padding: 0 10px;">&nbsp;</span> `#2083ff` |
| Background        | <span style="background-color: #ffffff; border: 1px solid #000; padding: 0 10px;">&nbsp;</span> `#ffffff` |
| Text              | <span style="background-color: #1a1a1a; padding: 0 10px;">&nbsp;</span> `#1a1a1a` |
