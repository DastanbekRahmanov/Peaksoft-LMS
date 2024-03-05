import GroupSvg from '../../assets/GroupsVector.svg'
import GroupActive from '../../assets/GroupsActive.svg'
import CoursesSvg from '../../assets/coursesVector.svg'
import CoursesActive from '../../assets/MyCoursesActive.svg'
import TeachersSvg from '../../assets/teachersVector.svg'
import TeachersActive from '../../assets/teachersActive.svg'
import StudentsSvg from '../../assets/studentsVector.svg'
import StudentsActive from '../../assets/studentsActive.svg'

export const ROUTES = {
   LOGIN: '/login',
   ADMIN: 'admin/*',
   STUDENT: 'student/*',
   INSTRUCTOR: 'instructor/*',
   // other routes under
}

export const VIEWER =
   'https://drive.google.com/viewerng/viewer?embedded=true&url='

export const ICONS_IMG = {
   GroupSvg,
   GroupActive,
   CoursesSvg,
   CoursesActive,
   TeachersSvg,
   TeachersActive,
   StudentsSvg,
   StudentsActive,
}
export const SIDELAYOUT_DATA = [
   {
      title: 'Группы',
      id: 1,
      path: '/admin/groups',
      photo: GroupSvg,
      activePhoto: GroupActive,
   },
   {
      title: 'Курсы ',
      id: 2,
      path: '/admin/courses',
      photo: CoursesSvg,
      activePhoto: CoursesActive,
   },
   {
      title: 'Учителя',
      path: '/admin/teachers',
      id: 3,
      photo: TeachersSvg,
      activePhoto: TeachersActive,
   },
   {
      title: 'Студенты',
      path: '/admin/students',
      id: 4,
      photo: StudentsSvg,
      activePhoto: StudentsActive,
   },
]

export const INSTRUCTOR_DATA = [
   {
      title: 'Мои курсы',
      id: 1,
      path: '/instructor',
      photo: CoursesActive,
      activePhoto: CoursesActive,
   },
]
export const STUDENT_DATA = [
   {
      title: 'Мои курсы',
      id: 1,
      path: '/student',
      photo: CoursesActive,
      activePhoto: CoursesActive,
   },
]

export const BASE_URL =
   'http://ec2-18-195-58-95.eu-central-1.compute.amazonaws.com/api/'

export const JWT_TOKEN_KEY = JSON.parse(localStorage.getItem('token'))

export const HEAD_DATA = [
   {
      idName: 'ID',
      firstName: 'Имя Фамилия',
      phoryatLearning: 'Специализация',
      phoneName: 'Номер телефона',
      emailName: 'E-mail',
      actionsName: 'Действия',
   },
]

export const STUDENT_HEADER = [
   {
      id: 1,
      idName: 'ID',
      firstName: 'Имя Фамилия',
      groupName: 'Группа',
      phoryatLearning: 'Формат',
      phoneName: 'Номер телефона',
      emailName: 'E-mail',
      actionsName: 'Действия',
   },
]

export const LEARNING_FORMAT = [
   {
      studyFormat: 'ONLINE',
   },
   {
      studyFormat: 'OFFLINE',
   },
]

export const LEARNING_FORMAT_STUDENTS = [
   {
      studyFormat: 'ONLINE',
   },
   {
      studyFormat: 'OFFLINE',
   },
   {
      studyFormat: 'ALL',
   },
]

export const COURSE_DATA_STUDENT = [
   {
      idName: 'ID',
      firstName: 'Имя Фамилия',
      groupName: 'Группа',
      phoryatLearning: 'Формат',
      phoneName: 'Номер телефона',
      emailName: 'E-mail',
   },
]
export const COURSE_DATA_TEACHERS = [
   {
      idName: 'ID',
      firstName: 'Имя Фамилия',
      phoryatLearning: 'Специализация',
      phoneName: 'Номер телефона',
      emailName: 'E-mail',
      actionsName: 'Действия',
   },
]

export const PATTERN_FOR_EMAIL =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const POLE_ZAPOLNEN = 'Поле обязательно к заполнению'

export const SELECT_OPTIONS = [
   {
      id: Math.random(),
      name: 'Видеоурок',
   },
   {
      id: Math.random(),
      name: 'Презентация',
   },
   {
      id: Math.random(),
      name: 'Задание',
   },
   {
      id: Math.random(),
      name: 'Ссылка',
   },
   {
      id: Math.random(),
      name: 'Тест',
   },
]
