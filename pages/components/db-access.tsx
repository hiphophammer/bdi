import { formatDate } from './util'
import { SupabaseClient } from '@supabase/auth-helpers-react'

// get the most recent Int from the table
// run the following query and return value if not null:
// SELECT number FROM dummy ORDER BY number DESC LIMIT 1;
const FetchInt = async ( supabase:SupabaseClient ) => {
    console.log(`Fetching int from the table...`);
    const t0 = performance.now();
    let { data, error } = await supabase
      .from( 'dummy' )
      .select( 'number' )
      .order( 'number', { ascending: false } )
      .limit( 1 );
    const t1 = performance.now();
    console.log(`Fetched Int from the table. Time elapsed: ${(t1-t0)} ms`);
    if ( error !== null ) { alert(`Error ${error.code}: ${error.message}`); return null; }
    if ( data === null ) return null;
    return ( data.length === 0 ? 0 : data[0].number );
}

// get the n rows from the table
// run the following query and return value if not null:
// SELECT * FROM dummy ORDER BY number ASC LIMIT nRows;
const FetchTable = async ( supabase: SupabaseClient, nRows:number ) => {
    console.log(`Fetching rows from the table...`);
    const t0 = performance.now();
    let { data, error } = await supabase
      .from( 'dummy' )
      .select()
      .order( 'number', { ascending: true } )
      .limit( nRows );
    const t1 = performance.now();
    console.log(`Fetched rows from the table. Time elapsed: ${(t1-t0)} ms`);
    if ( error !== null ) { alert(`Error ${error.code}: ${error.message}`); return null; }
    if ( data === null ) return null;
    return data;
}
  
const InsertInput = async ( supabase:SupabaseClient, int:number, inputs:any ) => {
    console.log(`Inserting input to the table...`);
    const t0 = performance.now();
    let { error } = await supabase
        .from( 'dummy' )
        .insert([{
        timestamp: formatDate(new Date()), 
        string: inputs.string,
        number: int + 1
        }]);
    const t1 = performance.now();
    console.log(`Inserted input to the table. Time elapsed: ${(t1-t0)} ms`);
    if ( error !== null ) { alert(`Error ${error.code}: ${error.message}`); return null; }
    else alert('Stored on the server!');
}

const InsertImage = async () => {
    
}

export { FetchInt, FetchTable, InsertInput }