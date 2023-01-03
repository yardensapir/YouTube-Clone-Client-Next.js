import { Button, Group, Modal, Progress, Text, Stack, TextInput, Switch } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { ArrowBigUpLine } from "tabler-icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { uploadVideo, updateVideo } from "../pages/api";
import { Video } from "../types";
import { useForm } from "@mantine/form";
import { AxiosError, AxiosResponse } from "axios";

function EditVideoForm({
    videoId,
    setOpened,
}: {
    videoId: string;
    setOpened: Dispatch<SetStateAction<boolean>>;
}) {

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            published: true,
        },
    });

    type input = Parameters<typeof updateVideo>

    const mutation = useMutation<AxiosResponse<Video>, AxiosError, input["0"]>(
        updateVideo, {
        onSuccess: () => {
            setOpened(false);
        },
    }
    );
    return <form onSubmit={form.onSubmit((values) =>
        mutation.mutate({ videoId, ...values })
    )} >

        <Stack>
            <TextInput
                label="Title"
                required
                placeholder="My awesome video"
                {...form.getInputProps("title")}
            />

            <TextInput
                label="Description"
                required
                {...form.getInputProps("description")}
            />

            <Switch label="Published" {...form.getInputProps("published")} />

            <Button type="submit">Save</Button>
        </Stack>


    </form>
}

export function UploadVideo() {
    const [opend, setOpend] = useState(false)
    const [progress, setProgress] = useState(0)
    const mutation = useMutation(uploadVideo)


    const config = {
        onUploadProgress: (ProgressEvent: any) => {
            const precent = Math.round(
                (ProgressEvent.loaded * 100) / ProgressEvent.total
            )
            setProgress(precent)
        }
    }

    const upload = (files: File[]) => {
        const formData = new FormData()
        formData.append('video', files[0])
        mutation.mutate({ formData, config })
    }

    return (
        <>
            <Modal
                closeOnClickOutside={false}
                onClose={() => setOpend(false)}
                opened={opend}
                title="Upload Video"
                size='xl'>

                {progress === 0 && <Dropzone
                    onDrop={(files) => {
                        upload(files)
                    }}
                    accept={[MIME_TYPES.mp4]}
                    multiple={false}>

                    <Group
                        position="center"
                        spacing="xl"
                        style={{
                            minHeight: "50vh",
                            justifyContent: "center",
                            flexDirection: "column"
                        }}
                    >
                        <ArrowBigUpLine />
                        <Text>Drag video here or click to find</Text>
                    </Group>
                </Dropzone>}
                {progress > 0 && <Progress
                    size="xl"
                    label={`${progress}%`}
                    value={progress} mb="xl"
                />}
                 {mutation.data && (
          <EditVideoForm
            setOpened={setOpend}
            videoId={mutation.data.videoId}
          />
        )}
            </Modal>

            <Button onClick={() => setOpend(true)}>Upload Video</Button>
        </>

    )
}