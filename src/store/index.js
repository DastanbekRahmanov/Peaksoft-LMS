/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit'
import { forgotPassSlice } from './slices/forgotPassSlice'
import { resetPassSlice } from './slices/resetPasswordSlice'
import { userSlice } from './slices/userSlice'
import { groupsSlice } from './slices/admin-slices/group-slices/groupsSlice'
import { adminStudentSlice } from './slices/admin-slices/admin-student/adminStudentSlice'
import { coursesSlice } from './slices/admin-slices/courses-slices/coureseSlice'
import { InsCoursesSlice } from './slices/instructor-slices/courses/coursesSlice'
import { teacherAdminSlice } from './slices/admin-slices/teacher-slices/addTeacherSlice'
import { insMaterials } from './slices/instructor-slices/materials/materialsSlice'
import { studentSlice } from './slices/student-slices/studentSlice'

const store = configureStore({
   reducer: {
      auth: userSlice.reducer,
      email: forgotPassSlice.reducer,
      newPassword: resetPassSlice.reducer,
      groups: groupsSlice.reducer,
      students: adminStudentSlice.reducer,
      courses: coursesSlice.reducer,
      insCourses: InsCoursesSlice.reducer,
      teacher: teacherAdminSlice.reducer,
      materials: insMaterials.reducer,
      student: studentSlice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

export default store
