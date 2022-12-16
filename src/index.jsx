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
  GlobalPage 
} from '@forge/ui';

import api, { 
  route 
} from '@forge/api';

  const App = () => {

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

      <Text>     </Text>

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

    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App/>
  </GlobalPage>
);