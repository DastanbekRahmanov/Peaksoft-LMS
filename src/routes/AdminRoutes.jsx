import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminCourseLayot from '../components/admin-courses/AdminCourseLayot'
import { CoursesPage } from '../containers/admin/CoursesPage'
import { CourseStudentsPage } from '../containers/admin/CourseStudentsPage'
import { CourseTeachersPage } from '../containers/admin/CourseTeachersPage'
import { GroupsInnerPage } from '../containers/admin/GroupsInnerPage'
import { GroupsPage } from '../containers/admin/GroupsPage'
import { StudentsPage } from '../containers/admin/StudentsPage'
import { TeachersPage } from '../containers/admin/TeachersPage'
import { NotFoundPage } from '../containers/NotFoundPage'
import SidebarLayout from '../layout/SidebarLayout'

export const AdminRoutes = () => {
   return (
      <SidebarLayout>
         <Routes>
            <Route path="/" element={<Navigate to="groups" />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/groups/:id" element={<GroupsInnerPage />} />
            <Route path="/courses" element={<AdminCourseLayot />}>
               <Route index element={<CoursesPage />} />
               <Route
                  path="course-students/:id"
                  element={<CourseStudentsPage />}
               />
               <Route
                  path="course-teachers/:id"
                  element={<CourseTeachersPage />}
               />
            </Route>
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </SidebarLayout>
   )
}
