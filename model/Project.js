class Project{
    constructor(customerName,projectName,projectDescription,teamSize,position,responsibility,techDescription){
        this.customerName = customerName || '';
        this.projectName = projectName || '';
        this.projectDescription = projectDescription || '';
        this.teamSize = teamSize || '';
        this.position = position || '';
        this.responsibility = responsibility || '';
        this.techDescription = techDescription || '';
    }
}

export default Project;