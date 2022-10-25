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
    // upload image to the bucket if it's upload
    let uploadedImageUrl:string|null = '';
    if ( inputs.image.upload && inputs.image.imageDesc ) {
      console.log( `Uploading ${inputs.image.imageDesc.name} to the bucket...` );
      uploadedImageUrl = await InsertImage( supabase, inputs.image.imageDesc );
    }
    const t1 = performance.now();
    if (false) console.log(`Image processing complete. Time elapsed: ${(t1-t0)} ms`);
    // insert info to the table
    let { error } = await supabase
        .from( 'dummy' )
        .insert([{
        timestamp: formatDate(new Date()), 
        string: inputs.string,
        number: int + 1,
        image: (inputs.image.upload ? uploadedImageUrl : inputs.image.imageDesc)
        }]);
    const t2 = performance.now();
    console.log(`Inserted input to the table. Time elapsed: ${(t2-t1)} ms`);
    if ( error !== null ) { alert(`Error ${error.code}: ${error.message}`); return null; }
    else alert('Stored on the server!');
}

const InsertImage = async ( supabase:SupabaseClient, file:File ) => {
  const { data, error } = await supabase
    .storage
    .from('dummy')
    .upload(`public/${file.name}`, file, {cacheControl: '3600'})
  if ( error !== null ) { alert(`Error: ${error.message}`); return null; }
  console.log(`data: ${data.path}`);

  const urlObj = await supabase.storage.from('dummy').getPublicUrl( data.path );
  console.log(`Uploaded URL: ${urlObj.data.publicUrl}`);
  return urlObj.data.publicUrl;
}

export { FetchInt, FetchTable, InsertInput }