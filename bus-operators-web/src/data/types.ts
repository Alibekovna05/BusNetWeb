export type BusResponse = {
    licensePlate: string;
    model: string;
    color: string;
    capacity: number;
    _links: {
        self: {
            href: string;
        },
        car: {
            href: string;
        },
        owner: {
            href: string;
        }
    };
}

export type Bus = {
    licensePlate: string;
    model: string;
    color: string;
    capacity: number;
}

export type BusEntry = {
    bus: Bus;
    url: string;
}