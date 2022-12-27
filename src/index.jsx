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

const fetchUsersIds = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/user/search?query`);
  const users = await response.json();
  var users_ids = [];
  var users_names = [];
  for (var user in users) {
    if (users[user].accountType == "atlassian") {
      // if (users[user].accountId == "557058:9cfab274-7819-48c5-a175-73b1bb984b0d" 
      //     || users[user].accountId == "6245ac79f813eb00692a1906") {
      //       continue;
      //     }
      users_ids.push(users[user].accountId);
      users_names.push(users[user].displayName);
    }
  }
  return users_ids;
}

const fetchUsersNames = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/user/search?query`);
  const users = await response.json();
  var users_ids = [];
  var users_names = [];
  for (var user in users) {
    if (users[user].accountType == "atlassian") {
      // if (users[user].avatarUrls.displayName == "Ferenc Molnár" 
      //     || users[user].avatarUrls.displayName == "Gergo Matyas") {
      //       continue;
      //     }
      users_ids.push(users[user].accountId);
      users_names.push(users[user].displayName);
    }
  }
  return users_names;
}

//*** not working well ***
const fetchTotalTimeOfUser = async (userId) => {
  var issueKeys = fetchIssuesKeys();
  
  var response = await api.asUser().requestJira(route`/rest/api/3/issue/FC-9/worklog`);
  var data = await response.json();
  var records = data.worklogs;
  var sum = "";
  var route_str = "hello";

  for (var issueKey in issueKeys) {
    route_str = "route`/rest/api/3/issue/" + issueKeys[issueKey] + "/worklog`";
    response = await api.asUser().requestJira(route_str);
    data = await response.json();
    records = data.worklogs;
    for (var record in records) {
      //if (records[record].author.accountId == userId) {
        sum = sum + record.timeSpent;
      //}
    }
  }

  return sum;

}






const App = () => {

  const [issueKeys] = useState(async () => await fetchIssuesKeys());

  const [test] = useState(async () => await fetchTotalTimeOfUser("635296ebfc0cc7a600adb7e6"));

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


        <Text>Number of Issues: {numIssues}</Text>
        <Text>Test: {JSON.stringify(test)}</Text>
        {/* {test.map(issue => (
          <Text content={issue} />
        ))} */}


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