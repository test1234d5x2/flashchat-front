interface ProfilePageProps {
    params: {
        id: string;
    };
}

export default function ProfilePage({ params }: ProfilePageProps) {
    const { id } = params;

    return (
        <div>
            <h1>Profile {id}</h1>
        </div>
    );
}