import React, {useState, useEffect, useCallback} from 'react'
import client from '../../client'
import  {marked} from 'marked'
import  DOMPurify from 'dompurify'

const getHTMlData = (rawData) => {

    const htmlString = marked(rawData)
    const sanitizedHTMLString = DOMPurify.sanitize(htmlString)
    return sanitizedHTMLString

}

const About = () => {
    const [about, setAbout] = useState({})
    const [isAboutLoading, setAboutLoading] = useState(false)

    const cleanUpAbout = useCallback((rawData) => {
        
            const {sys, fields} = rawData
            const {id} = sys
            const aboutTitle = fields.title 
            const aboutContent = getHTMlData(fields.content) 
            const aboutImage = fields.image.fields.file.url 
            let cleanAbout = {id, aboutTitle, aboutContent, aboutImage}
            

        

        setAbout(cleanAbout)
    }, [])

    const getAbout = useCallback(async () => {
        setAboutLoading(true)
        try {
            
            const response = await client.getEntry('2lEdFVWJDWe2Nj3prhDIPv')
            
            if (response) {

                cleanUpAbout(response)

            } else {
                setAbout({})
            }
            setAboutLoading(false)

        } catch (error) {
            console.log(error)
            setAboutLoading(false)
        }
    }, [cleanUpAbout]) 
     useEffect (() => {
         getAbout()
     }, [getAbout])

     const {aboutTitle, aboutImage, aboutContent} = about


    return (
        <section className='about' id='about'>
            <div className='row'>
                <div className='column'>
                    <h2 className='titleText'>{aboutTitle}</h2>
                    <div dangerouslySetInnerHTML={{__html: aboutContent }} />
                    </div>
                    <div className='column'>
                        <div className='imgWrap'>
                            <img src={aboutImage} alt={aboutTitle} />
                            
                            </div>
                        </div>
                </div>
            </section>
    )
}

export default About