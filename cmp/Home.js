import React,{useState,useEffect} from 'react';
import { View,Text,Image,ScrollView,FlatList} from 'react-native';
 const Home =(props)=>{
     const [datax,setData] = useState([]);
     const [isRefresh,setRefresh] = useState(false);
     const LoadApi =async ()=>{
        let url = "https://randomuser.me/api/?results=20";
        const res = await fetch(url);
        const p = await res.json();
        setData(p.results);
     };
     const refreshMe = ()=>{
         setRefresh(true);
        LoadApi().then(()=>{
            setRefresh(false);
        })
        
     };
     useEffect( ()=>{
        LoadApi(); 
     },[])

     return (
         <FlatList 
         onRefresh={()=>refreshMe()} 
         refreshing={ isRefresh}
            data={datax}
            keyExtractor ={ (item, index) => index.toString()}
            renderItem= { ({item}) =>{
                return (
                    <View>
                    <Text>{item.name.title+" "+ item.name.first}</Text>
                        <Image source={{ uri:item.picture.large}} 
                            style={{ width:128,height:128}}
                        />
                        </View>
                    
                    );
            }}

         />
     );
    /**
     * return (<ScrollView>
        
            { data.map((v)=>{
                return (
                <View>
                <Text>{v.name.title+" "+v.name.first }</Text>
                    <Image source={{ uri:v.picture.large}} 
                        style={{ width:128,height:128}}
                    />
                    </View>
                
                );
            }) }

    </ScrollView>)
     */
};
export default Home;