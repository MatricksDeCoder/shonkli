import React, { useContext, useState, useEffect } from 'react'
import PageTitle from '../components/common/PageTitle'
import Card from '../components/common/Card'
import { FetchContext } from '../context/FetchContext'
import { AuthContext } from '../context/AuthContext'
import GradientButton from '../components/common/GradientButton'
import { Formik, Form, Field } from 'formik'
import FormError from './../components/FormError'
import FormSuccess from './../components/FormSuccess'
import Label from '../components/common/Label'
import FormInput from '../components/FormInput'

const Account = () => {

  const fetchContext = useContext(FetchContext)

  const auth = useContext(AuthContext)

  const [successMessage, setSuccessMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [bio, setBio] = useState()

  useEffect(() => {

    const getBio = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(
          'users/bio'
        );
        setBio(data.bio)
      } catch (err) {
        console.log(err)
      }
    };
    getBio()
  }, [fetchContext.authAxios])

  const saveAccountDetails = async bio => {
    try {
      const { data } = await fetchContext.authAxios.patch(
        'users/bio',
        bio
      );
      setErrorMessage(null);
      setSuccessMessage(data.message);
    } catch (err) {
      const { data } = err.response;
      setSuccessMessage(null);
      setErrorMessage(data.message);
    }
  };
  /*
  const setUserRole = async role => {

    try {
      const { data } = await fetchContext.authAxios.patch(
        'users/role',
        {
          role
        }
      );
      setSuccessMessage(data.message);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }

  }
  */

  return (
    <>
      <PageTitle title="Account: View or update your account details." />
      
      <Card>
        <h2 className="font-bold mb-2">
          Fill Out Your Bio
        </h2>
        {successMessage && (
          <FormSuccess text={successMessage} />
        )}
        {errorMessage && <FormError text={errorMessage} />}
        <Formik
          initialValues={{
            bio
          }}
          onSubmit={values => saveAccountDetails(values)}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <Field
                className="border border-gray-300 rounded p-1 w-full h-12 mb-2"
                component="textarea"
                name="bio"
                placeholder={`Your current bio is: ${!auth.authState.userInfo.bio ? "Empty!": auth.authState.userInfo.bio}`}
              />
              <div className="flex">
                        <div className="mb-2 mr-2 w-1/2">
                          <div className="mb-1">
                            <Label text="Email" />
                          </div>
                          <FormInput
                            ariaLabel="Email Address"
                            name="email"
                            type="email"
                            placeholder={`Current: ${auth.authState.userInfo.email}`}
                          />
                        </div>
                        <div className="mb-2 ml-2 w-1/2">
                          <div className="mb-1">
                            <Label text="Twitter Username" />
                          </div>
                          <FormInput
                            ariaLabel="Twitter Username"
                            name="lastName"
                            type="text"
                            placeholder={`Current: ${auth.authState.userInfo.twitterName}`}
                          />
                        </div>
                        
                      </div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="New Password" />
                        </div>
                        <FormInput
                          ariaLabel="Change Password"
                          name="password1"
                          type="password"
                          placeholder="Your password is encrypted, not even our servers know it."
                        />
                      </div>
                      <div>
                        <div className="mb-1">
                          <Label text="Verify New Password" />
                        </div>
                        <FormInput
                          ariaLabel="Verify New Password"
                          name="password2"
                          type="password"
                          placeholder="Your password is encrypted, not even our servers know it."
                        />
                      </div>
                      <br></br>
              <GradientButton text="Update Your Account Details!" type="submit" />
            </Form>
          )}
        </Formik>
      </Card>

    </>

  );
};

export default Account;

