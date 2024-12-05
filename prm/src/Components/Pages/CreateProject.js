import React from "react";
import ProjectForm from "../Widgets/ProjectForm";
import Layout from "../../layout/Layout";


function CreateProject(props) {
    const handleCreate = (e, formData) => {
        console.log("Create:", formData);        
    };
    return (
        <Layout>
            <ProjectForm props="create" onSubmit={handleCreate} />
        </Layout>
    )
}
export default CreateProject