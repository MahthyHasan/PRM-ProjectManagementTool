import React, {useState} from "react";
import Layout from "../../layout/Layout";
import ProjectForm from "../Widgets/ProjectForm";

function ProjectSetting(props) {
    const [formDataForUpdate, setFormDataForUpdate] = useState({
        name: "Kekajan",
        key: "Key-01",
        teamType: "Team type 03",
        desc: "It is a sample project",
        errors: {},
    });
    const handleUpdate = (formData) => {
        console.log("Update:", formData);
        setFormDataForUpdate(null);
    };
    return (
        <Layout>
            {formDataForUpdate && (
                <ProjectForm
                    props="update"
                    initialData={formDataForUpdate}
                    onSubmit={handleUpdate}
                />
            )}
        </Layout>
    )
}

export default ProjectSetting