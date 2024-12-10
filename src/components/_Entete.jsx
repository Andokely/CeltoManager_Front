import { CardHeader, Typography, CardBody, Card } from "@material-tailwind/react";

export const _EnTete = ({ titre, valeur, icone, color }) => {

    return (
        <>
            <Card className="shadow-sm w-[90%] px-5" style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                <CardHeader
                    variant="gradient"
                    // color={color}
                    floated={false}
                    shadow={false}
                    className={`absolute ${color} grid h-9 w-9 place-items-center`}
                >
                    {icone}
                </CardHeader>
                <CardBody className="px-4 py-2 text-right">
                    <Typography variant="h6" color="blue-gray">
                        {titre}
                    </Typography>
                    <Typography variant="small" className="font-normal text-blue-gray-600">
                        {valeur}
                    </Typography>
                </CardBody>
            </Card>
        </>
    )
}