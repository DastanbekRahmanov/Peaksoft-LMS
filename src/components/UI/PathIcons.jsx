const PathIcons = ({ title, array, pathname }) => {
   const iconGenerator = () => {
      const foundItem = array.find((item) => item.title === title)
      const checkPath = pathname ? foundItem.activePhoto : foundItem.photo
      return <img src={checkPath} alt="icon" />
   }
   return <div>{iconGenerator()}</div>
}

export default PathIcons
