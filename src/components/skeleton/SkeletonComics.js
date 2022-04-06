import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
    <ContentLoader 
      speed={2}
      width={250}
      height={450}
      viewBox="0 0 250 450"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="11" y="374" rx="2" ry="2" width="220" height="12" /> 
      <rect x="11" y="397" rx="2" ry="2" width="150" height="12" /> 
      <rect x="11" y="14" rx="2" ry="2" width="220" height="345" />
    </ContentLoader>
)

const SkeletonComics = () => {
    return (
        <>
            <MyLoader/>
            <MyLoader/>
            <MyLoader/>
            <MyLoader/>
            <MyLoader/>
            <MyLoader/>
            <MyLoader/>
            <MyLoader/>
        </>
    )
}

export default SkeletonComics;
