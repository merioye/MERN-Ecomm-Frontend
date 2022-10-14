import ReviewList from 'components/admin/ReviewList';
import AdminLayout from 'components/shared/AdminLayout';


const ProductsReviews = ()=>{
    return( 
        <AdminLayout>
            <ReviewList/>
        </AdminLayout> 
    )
}

export default ProductsReviews;

ProductsReviews.getLayout = function PageLayout(page){
    return <>{page}</>
}