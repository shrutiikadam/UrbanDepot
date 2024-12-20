import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from '../firebaseConfig';
import { useLocation } from 'react-router-dom';
import './ForPay.css'; // Assuming your CSS file is named Forpay.css
import Loading from './Loading'; // Import the Loading component



const Forpay = () => {
    const [datewiseReservations, setDatewiseReservations] = useState({});
    const location = useLocation();
    const { platformFee } = location.state || {};
    const [loading, setLoading] = useState(true); // Initialize loading state

    
    // Function to fetch all reservations across all places
    const fetchAllReservations = async () => {
        try {
            const placesSnapshot = await getDocs(collection(db, 'places'));
            let reservationsList = [];

            // Loop through each place
            for (const placeDoc of placesSnapshot.docs) {
                const placeId = placeDoc.id;

                // Get the reservations subcollection for each place
                const reservationsSnapshot = await getDocs(collection(db, 'places', placeId, 'reservations'));

                // Add each reservation to the list, including the placeId
                reservationsSnapshot.forEach((reservationDoc) => {
                    const reservationData = reservationDoc.data();
                    const createdAt = reservationData.createdAt;

                    // Convert createdAt timestamp to date format
                    const reservationDate = new Date(createdAt).toLocaleDateString();

                    // Add formatted reservation with place ID and reservation ID
                    reservationsList.push({
                        placeId,
                        reservationId: reservationDoc.id,
                        reservationDate,
                        ...reservationData,
                    });
                });
            }

            // Group reservations by date and calculate total for each date
            const groupedReservations = reservationsList.reduce((acc, reservation) => {
                const { reservationDate, platform_fee } = reservation;
                if (!acc[reservationDate]) {
                    acc[reservationDate] = {
                        reservations: [],
                        total: 0,
                    };
                }
                acc[reservationDate].reservations.push(reservation);
                acc[reservationDate].total += Number(platform_fee) || 0; // Ensure platform_fee is treated as a number
                return acc;
            }, {});

            setDatewiseReservations(groupedReservations); // Set the grouped reservations in state
        } catch (error) {
            console.error("Error fetching all reservations:", error);
        } finally {
            setLoading(false); // Set loading to false when fetching is done
        }
    };

    useEffect(() => {
        fetchAllReservations(); // Call fetch function on component mount
    }, []);

    return (
        <div className="admin-page">
            {loading ? ( // Display Loading component while loading
                <Loading />
            ) : (
                <div>
                    {Object.keys(datewiseReservations).length > 0 ? (
                        Object.entries(datewiseReservations).map(([date, { reservations, total }]) => (
                            <div key={date}>
                                <h4>{date} (Total Earned: ₹{total})</h4>
                                {reservations.map((reservation) => (
                                    <div key={reservation.reservationId} className="reservation-card">
                                        <p><strong>Place ID:</strong> {reservation.placeId}</p>
                                        <p><strong>Reservation ID:</strong> {reservation.reservationId}</p>
                                        <p><strong>Contact:</strong> {reservation.contactNumber}</p>
                                        <p><strong>Email:</strong> {reservation.email}</p>
                                        <span className="total-amount">+{reservation.platform_fee}</span>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No reservations available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Forpay;