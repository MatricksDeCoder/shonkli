import React, { useContext, useState, useEffect } from 'react'
import GradientButton from '../components/common/GradientButton'
import PageTitle from '../components/common/PageTitle'
import { FetchContext } from '../context/FetchContext'
import {
    faCheck
} from '@fortawesome/free-solid-svg-icons';

const socialMedia = [
    {
        "name": "Facebook",
        "href": "https://twitter.com/Zed_Developer"
    },
    {
        "name": "Twitter",
        "href": "https://twitter.com/Zed_Developer"
    },
    {
        "name": "Linkedin",
        "href": "https://twitter.com/Zed_Developer"
    },
    {
        "name": "Reddit",
        "href": "https://twitter.com/Zed_Developer"
    },
    {
        "name": "Instagram",
        "href": "https://twitter.com/Zed_Developer"
    },
    {
        "name": "Pinterest",
        "href": "https://twitter.com/Zed_Developer"
    },

]


const showLinks = (arr,share) => {
    return arr.map((item,i) => {
        const {href, name, shared} = item
        if (share) {
        return (
            <div key = {i} className="mb-2 mr-2 w-1/6">
                <p 
                   title={name} 
                   className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                >   
                <span className="mx-auto">{name} <GradientButton text="Share" type="submit" /><input type="checkbox" checked={shared} disabled = {true}/></span>
                </p>               
            </div>
        )
        } else {
            return (
                <div key = {i} className="mb-2 mr-2 w-1/6">
                    <a href={href} 
                    title={name} 
                    target ="_blank" 
                    className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                    <span className="mx-auto">{name}</span>
                    </a>            
                </div>
            )
        }
    })
}

const Links = () => {

  const fetchContext = useContext(FetchContext)
  const [randlinks, setRandLinks] = useState([])
  const [adminLinks, setAdminLinks] = useState([])
  
  useEffect(() => {

    const getRandomLinks = async () => {
      console.log("Getting links....")
      try {
        const { data } = await fetchContext.authAxios.get(
          'url'
        );
        let res
        let admins
        if(data.urls) {
            res = data.urls.map(item => ({"name":item.slug,"href":item.url, shared: true}))
            admins = res.filter(item => item.role === 'admin')
            setTimeout(setAdminLinks(admins), 1000)
            res= res.sort(() => Math.random() - 0.5)
            console.log(res)
            res = res.slice(0,24)
            setRandLinks(res)
        }
      } catch (err) {
        console.log(err)
      }

    }
    getRandomLinks()

  }, [])

  return (
    <>
    <PageTitle title="Follow us on social media." />
    <div className = "flex">
        {showLinks(socialMedia,false)}
    </div>
    <PageTitle title="Earn points - Share our recommended links." />
    <div className = "flex">
        {showLinks(adminLinks, true)}
    </div>
    <PageTitle title="Earn points - Share other users *shonkli* links on Twitter." />
    <div className = "flex">
        {showLinks(randlinks, true)}
    </div>
    </>

  );
};

export default Links