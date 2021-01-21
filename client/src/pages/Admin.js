import React, { useContext, useState, useEffect } from 'react'
import PageTitle from '../components/common/PageTitle'
//import Card from '../components/common/Card'
//import { FetchContext } from '../context/FetchContext'
//import { AuthContext } from '../context/AuthContext'
//import GradientButton from '../components/common/GradientButton'
// import { Formik, Form, Field } from 'formik'
// import FormError from './../components/FormError'
// import FormSuccess from './../components/FormSuccess'
// import Label from '../components/common/Label'
// import FormInput from '../components/FormInput'
import Table from '../components/Table'

const Admin = () => {

  //const fetchContext = useContext(FetchContext)

  //const auth = useContext(AuthContext)

  useEffect(() => {

    console.log("READY ")
  }, [])
  
  return (
    <>
      <PageTitle title="Users" />
      <Table />  
    </>

  );
};

export default Admin;