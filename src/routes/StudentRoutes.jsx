import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentLayout from '../components/student/StudentLayout'
import { NotFoundPage } from '../containers/NotFoundPage'
import StudentInnerPage from '../containers/student/StudentInnerPage'
import StudentMain from '../containers/student/StudentMain'
import SidebarLayout from '../layout/SidebarLayout'
import StudentVideoPage from '../containers/student/StudentVideoPage'
import StudentPresentationPage from '../containers/student/StudentPresentationPage'
import StudentTaskPage from '../containers/student/StudentTaskPage'
import StudentLinkPage from '../containers/student/StudentLinkPage'
import StudentTestPage from '../containers/student/StudentTestPage'

export const StudentRoutes = () => {
   return (
      <SidebarLayout>
         <Routes>
            <Route path="/" element={<StudentLayout />}>
               <Route index element={<StudentMain />} />
               <Route path="lessons/:id" element={<StudentInnerPage />} />
               <Route
                  path="video-page/:videoId"
                  element={<StudentVideoPage />}
               />
               <Route path="task-page" element={<StudentTaskPage />} />
               <Route path="link-page" element={<StudentLinkPage />} />
               <Route path="test-page" element={<StudentTestPage />} />

               <Route
                  path="presentaion-page/:presentationId"
                  element={<StudentPresentationPage />}
               />
            </Route>
            <Route path="*" index element={<NotFoundPage />} />
         </Routes>
      </SidebarLayout>
   )
}
