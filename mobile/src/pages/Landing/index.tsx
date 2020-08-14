import React, { useState, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';
import api from '../../services/api';

function Landing () {
    const [totalConnectios, setTotalConnectios] = useState(0);
    
    const navigation = useNavigation()

    useEffect(()=>{
        api.get('/connections').then(response => {
            const {total} = response.data;

            setTotalConnectios(total);
        });
    }, [])

    function handleNavigateToGiveClasses () {
        navigation.navigate('GiveClasses')//name="GiveClasses" na pasta routes
    }

    function handleNavigateToStudyPage () {
        navigation.navigate('Study')
    }

   


    return (
        <View style={styles.container} >
            <Image source={landingImg} style={styles.banner}/>

            <Text style={styles.title} >
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?        
                </Text> 
            </Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleNavigateToStudyPage} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>                    
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNavigateToGiveClasses} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon}/>
                    <Text style={styles.buttonText}>Dar aulas</Text>                    
                </TouchableOpacity>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnectios} conexões ja realizadas {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    );
}

export default Landing;


