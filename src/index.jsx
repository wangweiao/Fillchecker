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
      <Form onSubmit={onSubmit}>
        <Table>
          <Row>

            <Cell>
              <Text>
                <Strong>Start date:</Strong>
              </Text>

              <DatePicker name="startdate" label="" placeholder="Please select!" isRequired={true}/>

            </Cell>

            <Cell>
              <Text>
                <Strong>End date:</Strong>
              </Text>

              <DatePicker name="enddate" label="" placeholder="Please select!" isRequired={true}/>
              
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