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
    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App/>
  </GlobalPage>
);