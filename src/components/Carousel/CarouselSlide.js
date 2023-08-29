import react from "react"




const carouselSlide = (props) => {

    const {id, slideTitle, slideDescription, slideBg} = props
    return (
        <div className="slideWrap" style={{backgroundImage: `url(${slideBg})`}}>
        <div className="textWrap">
            <h2>{slideTitle}</h2>
            <p>{slideDescription}</p>
            <a href="./About/About.js" className="btn">और अधिक जानें</a>
            
            
            
            </div>
        </div>
    )
}

export default carouselSlide