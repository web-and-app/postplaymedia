import { Inter } from 'next/font/google'
import 'node_modules/bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
const inter = Inter({ subsets: ['latin'] })
import '../../public/assets/css/style.css'
import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';
import Head from 'next/head';
import ActivityHeader from '@/components/layout/ActivityHeader';
import ActivityLayout from './ActivityLayout';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import ActivitySidebar from '@/components/layout/ActivitySidebar';
import ChatSideBar from '@/components/chatcomponents/ChatSideBar';

export const metadata = {
  title: 'Post Play Media',
  description: 'Generated by create next app',
}

export default function RootLayout({ children, MessagePages, Activity, ProfilePages }) {
  console.log(Activity)
  return (
    Activity ?
      <>
        <html lang="en">
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          </Head>
          <body className={inter.className}>
            <NextTopLoader color="#383a45"
              showSpinner={false}
              crawlSpeed={1} />

            <div className="container-fluid px-0">
              <div className="row w-100 mx-0">
                <div className="sidebar-size px-0">
                  <ActivitySidebar />
                </div>
                <div className="col px-0">
                  <div className="">
                    <ActivityHeader />
                    <div className="container py-0">
                      {children}
                    </div>
                  </div>
                </div>
                <div className="chatbar-size px-0">
                  <ChatSideBar />
                </div>
              </div>
            </div>




            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
          </body>
        </html >

      </>
      :


      <html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        </Head>
        <body className={inter.className}>
          <NextTopLoader color="#383a45"
            showSpinner={false}
            crawlSpeed={1} />

          {children}




          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
        </body>
      </html >




  )
}
