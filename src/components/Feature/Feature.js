import React, {useState, useEffect, useCallback} from 'react'
import client from '../../client'
import '../../../node_modules/swiper/swiper.scss'
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore, {Navigation} from "swiper"
import FeatureSlide from './FeatureSlide'
import  {marked} from 'marked'
import  DOMPurify from 'dompurify'

const getHTMlData = (rawData) => {

    const htmlString = marked(rawData)
    const sanitizedHTMLString = DOMPurify.sanitize(htmlString)
    return sanitizedHTMLString

}






const Feature = () => {
    const [feature, setFeature] = useState([])
    const [isFeatureLoading, setFeatureLoading] = useState(false)

    const cleanUpFeatureSlide = useCallback((rawData) => {
        const clearFeature = rawData.map((feature) => {
            const {sys, fields} = feature
            const {id} = sys
            const featureTitle = fields.title 
            const featureDescription = getHTMlData(fields.description)
            const featureSg = fields.image.fields.file.url 
            const updatedFeature = {id, featureTitle, featureDescription, featureSg}
            return updatedFeature

        })

        setFeature(clearFeature)
    }, [])



const getFeature = useCallback(async () => {
    setFeatureLoading(true)
    
    try {

        const response = await client.getEntries({content_type: 'indiaFeature'})
        const responseData = response.items

        if (responseData) {
            cleanUpFeatureSlide(responseData)
        } else {
            setFeature({})
        }
        setFeatureLoading(false)

    } catch (error) {
        console.log(error)
        setFeatureLoading(false)
    }
}, [cleanUpFeatureSlide]) 
useEffect (() => {
    getFeature()
}, [getFeature])



return (
    <div className='featureSlides'>
            <Swiper >
            {feature.map((item) => {
                const {id, featureSg, featureTitle, featureDescription} = item
                return (
                    <SwiperSlide key={id}>
                         <FeatureSlide  featureTitle={featureTitle} featureDescription={featureDescription} featureSg={featureSg}  />
                    </SwiperSlide>
                )
            })}
            </Swiper>
            
        </div>
    
)

}

export default Feature