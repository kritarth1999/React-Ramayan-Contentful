import react from "react"




const featureSlide = (props) => {

    const {id, featureTitle, featureDescription, featureSg} = props
    return (
        <div className="slideFeature" style={{backgroundImage: `url(${featureSg})`}}>
        <div className="textFeature">
            <h2>{featureTitle}</h2>
            <div dangerouslySetInnerHTML={{__html: featureDescription }} />

            </div>
            
            </div>

    )
}

export default featureSlide