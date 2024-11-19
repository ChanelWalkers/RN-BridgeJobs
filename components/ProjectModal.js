import { Modal, View, StyleSheet, Text, ScrollView, KeyboardAvoidingView,Platform } from "react-native";
import { useState } from "react";
import Project from "../model/Project";
import Colors from "../constants/Colors";
import TextArea from "./TextArea";
import PressableCustom from "./PressableCustom";
import TextInputForm from "./TextInputForm";


function ProjectModal({ visible, onClose, onSave, projects }) {
    const [customerName, setCustomerName] = useState(projects?.customerName || '');
    const [projectDes, setProjectDes] = useState(projects?.projectDescription || '');
    const [teamSize, setTeamSize] = useState(projects?.teamSize || '');
    const [position, setPosition] = useState(projects?.position || '');
    const [responsibility, setResponsibillity] = useState(projects?.responsibility || '');
    const [projectName, setProjectName] = useState(projects?.projectName || '');
    const [techDes, setTechDes] = useState(projects?.techDescription || '');

    const handleSave = () => {
        const newProject = new Project(customerName, projectName, projectDes, teamSize, position, responsibility, techDes);
        onSave(newProject);
        onClose();
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add Project</Text>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <TextInputForm
                                label={"Customer Name"}
                                onChangeText={setCustomerName}
                                placeholder={"Customer Name"}
                                value={customerName}
                            />

                            <TextInputForm
                                label={"Project Name"}
                                onChangeText={setProjectName}
                                placeholder={"Project Name"}
                                value={projectName}
                            />

                            <TextArea
                                placeholder={"Project Description"}
                                label={"Project Description"}
                                onChangeText={setProjectDes}
                                value={projectDes}
                            />

                            <TextInputForm
                                label={"Team size"}
                                onChangeText={setTeamSize}
                                placeholder={"Team size"}
                                value={teamSize}
                            />

                            <TextArea
                                label={"Responsibillity"}
                                value={responsibility}
                                onChangeText={setResponsibillity}
                                placeholder={"Your Contribution in Project"}
                            />

                            <TextArea
                                label={"Tech Description"}
                                placeholder={"Tech Description"}
                                value={techDes}
                                onChangeText={setTechDes}
                            />
                            <View style={styles.modalButtonContainer}>
                                <PressableCustom onPress={onClose} title={"Cancle"} />
                                <PressableCustom onPress={handleSave} title={"Save"} />
                            </View>
                        </ScrollView>
                    </View>
            </View>
        </Modal>
    );
}

export default ProjectModal;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: Colors.titleButton,
        borderRadius: 5,
    },
    addProjectButton: {
        backgroundColor: Colors.button,
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 15,
    },
    addProjectText: {
        color: Colors.titleButton,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        zIndex: 10,
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: Colors.txtField,
        borderRadius: 10,
        zIndex: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    keyBoardContainer:{
        flex: 1,
        justifyContent: 'space-between',
    }
});
