import React, { useContext, useState, useEffect } from 'react'
import PageTitle from '../components/common/PageTitle'
//import Card from '../components/common/Card'
import { FetchContext } from '../context/FetchContext'
import { AuthContext } from '../context/AuthContext'
//import GradientButton from '../components/common/GradientButton'
// import { Formik, Form, Field } from 'formik'
// import FormError from './../components/FormError'
// import FormSuccess from './../components/FormSuccess'
// import Label from '../components/common/Label'
// import FormInput from '../components/FormInput'

import Table from "../components/Table/Table";

const Headers = [
  {'name':'FirstName','label':'firstName'},
  {'name':'LastName', 'label':'lastName'},
  {'name':'Email','label':'email'},
  {'name':'Joined','label':'created'},
  {'name':'Twitter','label':'twitterName'},
  {'name':'About','label':'bio'},
  {'name':'UrlsCount','label':'urlsCount'},
  {'name':'Points','label':'points'},
  {'name':'Role','label':'role'},
]

const Users = [
  {
    _id: '553670w002555',
    firstName: 'John',
    lastName: 'Welly',
    email: 'john@gmail.com',
    created: '21 June 2020',
    twitterName: 'Zed_Developer',
    bio: ' a good bio',
    urlsCount : 5,
    points: 27,
    role: 'admin'
  },
  {
    _id: '51123928303032',
    firstName: 'Jim',
    lastName: 'Great',
    email: 'jim@gmail.com',
    created: '11 May 2020',
    twitterName: 'Zed_Developer',
    bio: 'the bad bio',
    urlsCount : 1,
    points: 11,
    role: 'user'
  }
]


const Admin = ()  => {

  const fetchContext = useContext(FetchContext)

  const auth = useContext(AuthContext)

  const [users, setUsers] = useState(Users)

  useEffect(() => {

    const getAllUsers = async () => {
      try {
        console.log("Getting All User from DB.....")
        const { data } = await fetchContext.authAxios.get(
          'users'
        );
        console.log("DATA >>>>>: ", data)
        setTimeout(setUsers(data.users), 2000)
      } catch (err) {
        console.log(err)
      }
    };
    getAllUsers()
  }, [])
 
  return (

      <div className="flex justify-center mt-8">
        <Table title = {'Users'} data = {users} headers = {Headers} />
      </div>

  )
}

export default Admin