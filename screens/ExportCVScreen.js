import { ScrollView, StyleSheet, TextInput, Text, Button, Alert, View, Pressable } from "react-native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from 'expo-sharing';
import Colors from '../constants/Colors'
import { useState } from "react";
import TextInputForm from "../components/TextInputForm";
import TextArea from "../components/TextArea";
import ProjectModal from "../components/ProjectModal";
import PressableCustom from "../components/PressableCustom";


function ExportCVScreen() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [objective, setObjective] = useState("");
  const [education, setEducation] = useState("");
  const [workExp, setWorkExp] = useState("");
  const [activity, setActivity] = useState("");
  const [cert, setCert] = useState("");
  const [honorAw, setHonorAw] = useState("");
  const [skills, setSkills] = useState("");
  const [interest, setInterest] = useState("");
  const [additional, setAdditional] = useState("");
  const [projects, setProjects] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentProjectIndex] = useState(null);

  const handleDeleteProject = (index) => {
    Alert.alert(
      'Confirm',
      'Do you wanna delete this Project',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedProjects = projects.filter((_, i) => i !== index);
            setProjects(updatedProjects);
            Alert.alert('Success', 'Project has been deleted');
          }
        }
      ]);
  }

  const handleEditProject = (index) => {
    setCurrentProjectIndex(index);
    setModalVisible(true);
  }

  const handleSaveProject = (projectData) => {
    if (currentIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[currentIndex] = projectData;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, projectData]);
    }
  };

  const handleGenerate = async () => {
    try {
      const html = `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume Template</title>
  <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    body {
      font-family: 'Times New Roman', serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 20px auto;
      border: 1px solid #000;
      padding: 20px;
    }
    h1 {
      text-align: center;
      font-size: 24px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .contact {
      text-align: center;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 5px;
      border-bottom: 1px solid #000;
    }
    .content {
      font-size: 14px;
      margin-left: 10px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .table th, .table td {
      border: 1px solid #000;
      padding: 8px;
      text-align: left;
    }
    .table th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${name.toUpperCase()}</h1>
    <div class="contact">
        <p> <i class="fa-solid fa-phone"></i> ${phoneNumber} | <i class="fa-solid fa-envelope"></i> ${email} | <i class="fa-solid fa-location-dot"></i> ${address}</p>
    </div>

    <div class="section">
      <div class="section-title">Objective</div>
      <div class="content">${objective}</div>
    </div>

    <div class="section">
      <div class="section-title">Education</div>
      <div class="content">${education}</div>
    </div>

    ${workExp ? `
    <div class="section">
      <div class="section-title">Work Experience</div>
      <div class="content">${workExp}</div>
    </div> `: ''}

    ${activity ? `
    <div class="section">
      <div class="section-title">Activities</div>
      <div class="content">${activity}</div>
    </div>` : ''}

    ${cert ? `
    <div class="section">
      <div class="section-title">Certifications</div>
      <div class="content">${cert}</div>
    </div> ` : ''}

    ${honorAw ? `
    <div class="section">
      <div class="section-title">Honors & Awards</div>
      <div class="content">-</div>
    </div> ` : ''}

    <div class="section">
      <div class="section-title">Skills</div>
      <div class="content">${skills}</div>
    </div>


    <div class="section">
      <div class="section-title">Projects</div>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
        ${projects.map((project, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>
            ${project.customerName ? `
              <strong>Name of customer: ${project.customerName} </strong> <br> ` : ''}
              <strong>Project Name: ${project.projectName}</strong> <br>
              <strong>Description project: ${project.projectDescription}</strong> <br>
              <strong>Your team size: ${project.teamSize}</strong> <br>
            ${project.position ? `
            <strong>Your position in project: ${project.position}</strong> <br> ` : ''
        }
              <strong>Your responsibility in project: ${project.responsibility}
              </strong> <br>
              <strong>Technology description: ${project.techDescription}</strong>
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    ${interest ? `
    <div class="section">
      <div class="section-title">Interests</div>
      <div class="content">${interest}</div>
    </div> ` : ''}

    ${additional ? `
    <div class="section">
      <div class="section-title">Additional Information</div>
      <div class="content">${additional}</div>
    </div>` : ''}
  </div>
</body>
</html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      const fileUri = FileSystem.documentDirectory + `CV_${name}.pdf`;
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      Alert.alert('PDF file has been created and saved successfully', `Saved at: ${fileUri}`);


      await copyToDownloads(fileUri);

    } catch (error) {
      Alert.alert('Error', 'An error occured while creating PDF file!');
      console.error(error);
    }
  };

  const copyToDownloads = async (sourceUri) => {
    try {
      const destinationUri = FileSystem.documentDirectory + `Downloads/CV_${name}.pdf`;

      const fileInfo = await FileSystem.getInfoAsync(sourceUri);
      if (!fileInfo.exists) {
        Alert.alert('Lỗi', 'Tệp PDF không tồn tại!');
        return;
      }

      await FileSystem.copyAsync({ from: sourceUri, to: destinationUri });
      Alert.alert('PDF file has been copied in Downloads Folder');

      await sharePDF(destinationUri);

    } catch (error) {
      Alert.alert('Error', 'Has Error occured while copying PDF file');
      console.error(error);
    }
  };

  const sharePDF = async (fileUri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        Alert.alert('Error', 'PDF file does not exist');
        return;
      }

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert('Error', 'Has Error occured when sharing PDF file');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInputForm
        label={"Full Name"}
        value={name}
        onChangeText={setName}
        placeholder={"Your Full Name"}
      />
      <TextInputForm label={"Phone Number"}
        placeholder={"+84"}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInputForm label={"Email"}
        placeholder={"abc@gmail.com"}
        value={email}
        onChangeText={setEmail}
      />
      <TextInputForm
        label={"Address"}
        placeholder={"Street,Ward,District,City"}
        onChangeText={setAddress}
        value={address}
      />
      <TextArea
        label={"Objective"}
        placeholder={"I'd like to"}
        value={objective}
        onChangeText={setObjective}
      />
      <TextInputForm
        label={"Education"}
        onChangeText={setEducation}
        placeholder={"Your school you graduted or studying"}
        value={education}
      />
      <TextArea
        label={"Work Experience"}
        value={workExp}
        onChangeText={setWorkExp}
        placeholder={"Describe your exp"}
      />
      <TextArea
        label={"Activities"}
        value={activity}
        onChangeText={setActivity}
        placeholder={"Describe your activities"}
      />
      <TextArea
        label={"Certifications"}
        value={cert}
        onChangeText={setCert}
        placeholder={"List of your certifications"}
      />
      <TextArea
        label={"Honors and Awards"}
        value={honorAw}
        onChangeText={setHonorAw}
        placeholder={"List of your awards"}
      />
      <TextArea
        label={"Skills"}
        value={skills}
        onChangeText={setSkills}
        placeholder={"Your Skills"}
      />
      <Pressable
        style={styles.addProjectButton}
        onPress={() => {
          setModalVisible(true);
          setCurrentProjectIndex(null);
        }}
      >
        <Text style={styles.addProjectText}>Add Project</Text>
      </Pressable>

      {projects.length > 0 && (
        <View>
          <Text style={styles.projectLabel}>Your Project</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectContainer}>
              <Text>{project.projectName}</Text>
              <View style={styles.buttonProjectContainer}>
                <PressableCustom style={styles.buttonProject} title={"Edit Project Information"} onPress={() => handleEditProject(index)} />
                <PressableCustom style={styles.buttonProject} title={"Delete Your Project"} onPress={() => handleDeleteProject(index)} />
              </View>
            </View>
          ))}
        </View>
      )}


      <ProjectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveProject}
      />
      <TextArea
        label={"Interests"}
        value={interest}
        onChangeText={setInterest}
        placeholder={"Your hobby"}
      />
      <TextArea
        label={"Additional Information"}
        value={additional}
        onChangeText={setAdditional}
        placeholder={"Your information in other social"}
      />
      <PressableCustom title={"GENERATE PDF"} onPress={handleGenerate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    color: Colors.txt
  },
  button: {
    backgroundColor: Colors.button,
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  txtInnerButton: {
    color: Colors.titleButton,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addProjectButton: {
    backgroundColor: Colors.button,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 8,
    width: '25%',
    marginLeft: '75%',
  },
  addProjectText: {
    color: Colors.titleButton,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectContainer: {
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  projectLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    color: Colors.txt,
  },
  buttonProjectContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
  },
  buttonProject: {
    width: '40%',
    paddingHorizontal: 5,
    marginHorizontal: 8,
    marginHorizontal: 10,
  }
});

export default ExportCVScreen;
