import ForgeUI, { 
  render, 
  Button,
  Text, 
  Strong, 
  Form, 
  TextField,
  CheckboxGroup,
  Checkbox,
  Macro,
  DatePicker, 
  useState,
  Fragment, 
  Table,
  Cell,
  Head,
  Row,
  UserPicker,
  Heading,
  GlobalPage 
} from '@forge/ui';

import api, { 
  route 
}  from '@forge/api';



const fetchNumberOfIssues = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/search`);
  const data = await response.json();
  return data.total;
}

const fetchIssuesKeys = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/search`);
  const data = await response.json();
  const issues_json = data.issues;
  var issues_keys = [];
  for (var issue in issues_json) {
    issues_keys.push(issues_json[issue].key);
  }
  return issues_keys;
}






const App = () => {

  const [test] = useState(async () => await fetchIssuesKeys());

  const [numIssues] = useState(async () => await fetchNumberOfIssues());

  // useState is a UI kit hook we use to manage the form data in local state
  const [formState, setFormState] = useState(undefined);

  // Handles form submission, which is a good place to call APIs, or to set component state...
  const onSubmit = async (formData) => {
    /**
      formData:
      {
         startdate: 'Startdate',
         enddate: 'Enddate'
      };
    */
    setFormState(formData);
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit} submitButtonText="Filter">
        <Text>Test: {JSON.stringify(test)}</Text>
        <Table>
          <Row>

            <Cell>
              <Text>
                <Strong>Start date:</Strong>
              </Text>

              <DatePicker name="startdate" label="" placeholder="Select a date..." isRequired={true}/>

            </Cell>

            <Cell>
              <Text>
                <Strong>End date:</Strong>
              </Text>

              <DatePicker name="enddate" label="" placeholder="Select a date..." isRequired={true}/>

            </Cell>

            </Row>

            <Row>
              <Cell>
                <Text>
                  <Strong>User:</Strong>
                </Text>

                <UserPicker label="" name="user"/>
              </Cell>
            </Row>
        </Table>
      </Form> 
      
      {formState && <Text>{JSON.stringify(formState)}</Text>}

      {formState && <Heading size="medium">Records</Heading>}

      {formState && 
      <Table>
        <Head>
          <Cell>
            <Text>
              <Strong>User</Strong>
            </Text>
          </Cell>
          <Cell>
            <Text>
              <Strong>Date</Strong>
            </Text>
          </Cell>
          <Cell>
            <Text>
              <Strong>Logged Time</Strong>
            </Text>
          </Cell>
          <Cell>
            <Text>
              <Strong>Required Time</Strong>
            </Text>
          </Cell>
          <Cell>
            <Text>
              <Strong>Missing Time</Strong>
            </Text>
          </Cell>
        </Head>
        
      </Table>
      }


    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App/>
  </GlobalPage>
);