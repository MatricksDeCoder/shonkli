import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import PageTitle from '../components/common/PageTitle';
import DashboardMetric from './../components/DashboardMetric';
import Card from '../components/common/Card';
import {
  faChartArea,
  faDollarSign,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FetchContext } from '../context/FetchContext';
import { formatCurrency } from './../util';
import DashboardChart from './../components/DashboardChart';
import GradientButton from '../components/common/GradientButton'
import { Formik, Form, Field } from 'formik'
import FormError from './../components/FormError'
import FormSuccess from './../components/FormSuccess'
import Label from '../components/common/Label'
import FormInput from '../components/FormInput'
import { AuthContext } from '../context/AuthContext'
import Table from "../components/Table/Table";


const Headers = [
  {'name':'Long URL ','label':'url'},
  {'name':'Short URL', 'label':'slug'},
  {'name':'Created','label':'created'},
  {'name':'Views','label':'visits'},
]

const URLS = [
  {
    _id: '553670w002555',
    url: 'https://www.google.com',
    slug: 'newsc',
    userId: '5999327228419',
    created: '21 June 2020',
    visits: 45
  },
  {
    _id: '553670w002555',
    url: 'https://www.twitter.com',
    slug: 'bewct',
    userId: '509932745419',
    created: '21 May 2020',
    visits: 8
  }
]

const Dashboard = () => {
  const fetchContext = useContext(FetchContext);
  const auth = useContext(AuthContext)


  const [dashboardData, setDashboardData] = useState();
  const [successMessage, setSuccessMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [urls, setURLS] = useState(URLS)
 
  console.log("URLS::::::::: ", urls)

  const bio = 'Hello'

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(
          'dashboard-data'
        );
        setDashboardData(data);
      } catch (err) {
        console.log(err);
      }
    };

    getDashboardData();
  }, [fetchContext]);

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

  return (
    <>
      <PageTitle title="Shonkli URL Shortener" />
      <Card>
        <h2 className="font-bold mb-2">
          Create short url - from your long url.
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
              <div className="flex">
                        
                      </div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="Long Url" />
                        </div>
                        <FormInput
                          ariaLabel="Long URL "
                          name="longUrl"
                          type="text"
                          placeholder="Enter long url you want to shorten e.g https://www.myverylongurl/itis verylong/evenlonger?yes=long"
                        />
                      </div>
                      <div>
                        <div className="mb-1">
                          <Label text="Short Url" />
                        </div>
                        <FormInput
                          ariaLabel="Short Url"
                          name="shortUrl"
                          type="text"
                          placeholder="Enter short url of your choice 5 characters long e.g shott. If you leave blank we create for you"
                        />
                      </div>
                      <br></br>
              <GradientButton text="Shorten URL" type="submit" />
            </Form>
          )}
        </Formik>
      </Card>
      <Table title = {'Your URLS'} data = {urls} headers = {Headers} />
      {dashboardData ? (
        <>
        
          <div className="w-full mt-4">
            <Card>
              {dashboardData && (
                <DashboardChart
                  salesData={dashboardData.graphData}
                />
              )}
            </Card>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Dashboard;
