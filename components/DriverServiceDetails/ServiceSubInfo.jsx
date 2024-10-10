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
                    title={service?.titlePassenger || service?.titleDate || service?.titleServiceDays || service?.titleName}
                    value={service?.passengers || service?.valueDate || service?.dates || service?.name}
                />

                <ServiceSubInfoCard
                    icon={service?.weightImage || service?.imagePhone || service?.imageVehicle}
                    title={service?.titleWeight || service?.titlePhone || service?.titleVehicleNo || service?.titleMake}
                    value={service?.curbWeight || service?.valuePhone || service?.valueVehicleNo || service?.make}
                />
            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <ServiceSubInfoCard
                    icon={service?.fuelImage || service?.imageWaste || service?.imageDriver}
                    title={service?.titleFuelType || service?.titleWasteType || service?.titleDriver || service?.titleQuantity}
                    value={service?.fuel || service?.valueWasteType || service?.valueDriver || service?.quantity}
                />

                <ServiceSubInfoCard
                    icon={service?.powerImage || service?.imageWasteWeight || service?.imageContact}
                    title={service?.titlePower || service?.titleWasteWeight || service?.titleContact || service?.titlePart}
                    value={service?.power || service?.valueWeight || service?.valueContact || service?.vehiclePart}
                />
            </View>
        </View>
    )
}