import { View, Text } from 'react-native'
import React from 'react'
import ServiceSubInfoCard from './ServiceSubInfoCard'

export default function ServiceSubInfo({ service }) {
    return (
        <View style={{
            padding: 20
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <ServiceSubInfoCard
                    icon={service?.passengerImage || service?.imageDate}
                    title={service?.titlePassenger || service?.titleDate || service?.titleServiceDays}
                    value={service?.passengers || service?.valueDate || service?.dates}
                />

                <ServiceSubInfoCard
                    icon={service?.weightImage || service?.imagePhone || service?.imageVehicle}
                    title={service?.titleWeight || service?.titlePhone || service?.titleVehicleNo}
                    value={service?.curbWeight || service?.valuePhone || service?.valueVehicleNo}
                />
            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <ServiceSubInfoCard
                    icon={service?.fuelImage || service?.imageWaste || service?.imageDriver}
                    title={service?.titleFuelType || service?.titleWasteType || service?.titleDriver}
                    value={service?.fuel || service?.valueWasteType || service?.valueDriver}
                />

                <ServiceSubInfoCard
                    icon={service?.powerImage || service?.imageWasteWeight || service?.imageContact}
                    title={service?.titlePower || service?.titleWasteWeight || service?.titleContact}
                    value={service?.power || service?.valueWeight || service?.valueContact}
                />
            </View>
        </View>
    )
}