import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import InputLabel from "@/Components/InputLabel"
import InputError from "@/Components/InputError"
import TextInput from "@/Components/TextInput"
import PrimaryButton from "@/Components/PrimaryButton"
export default function edit({auth, project}){

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">edit</h2>}

        >

            <form>
                <div>
                    <InputLabel htmlFor="project" value="project" />

                    <TextInput

                        id="project"
                        type="text"
                        name="project"
                        value={ project.name}
                        className="mt-1 block w-full"
                        // autoComplete="project"
                        isFocused={true}
                        // onChange={(e) => setData('project', e.target.value)}
                    />

                    <InputError message='' className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="project" value="project" />

                    <TextInput
                        id="project"
                        type="text"
                        name="project"
                        value={project.name}
                        className="mt-1 block w-full"
                        // autoComplete="project"
                        isFocused={true}
                        // onChange={(e) => setData('project', e.target.value)}
                    />

                    <InputError message='' className="mt-2" />
                </div>

                <div className="block mt-4">


                    <PrimaryButton className="ms-4" >
                        update
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>

    )
}
