// src/screens/CartScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '@/Redux/slices/cartSlice';
import { fetchSingleProduct } from '@/Redux/slices/singleProductSlice';
import { RootState } from '@/Redux/store';
import CartHeader from '@/components/Cart/CartHeader';
import DeliveryAddress from '@/components/Cart/DeliveryAddress';
import SelectAllToggle from '@/components/Cart/SelectAllToggle';
import CartItem from '@/components/Cart/CartItem';
import CheckoutButton from '@/components/Cart/CheckoutButton';


const CartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartList.cart);
  const cartStatus = useSelector((state: RootState) => state.cartList.status);
  const products = useSelector((state: RootState) => state.singleCardProduct.products);
  const productStatus = useSelector((state: RootState) => state.singleCardProduct.status);

  const [selectedItems, setSelectedItems] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    dispatch(fetchCartItems(2)).unwrap().then((res: any) => {
      res.products.forEach((item: any) => {
        dispatch(fetchSingleProduct({ productId: item.productId }));
      });
    });
  }, [dispatch]);

  const toggleSelectItem = (productId: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const toggleSelectAll = () => {
    const allSelected = Object.values(selectedItems).every((selected) => selected);
    const newSelectionState = cart?.products.reduce((acc, item) => {
      acc[item.productId] = !allSelected;
      return acc;
    }, {} as { [key: number]: boolean }) || {};

    setSelectedItems(newSelectionState);
  };

  if (cartStatus === 'loading' || productStatus === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CartHeader />
      <DeliveryAddress />
      <FlatList
        data={cart?.products || []}
        keyExtractor={(item) => item.productId.toString()}
        ListHeaderComponent={
          <SelectAllToggle
            allSelected={Object.values(selectedItems).every((selected) => selected)}
            toggleSelectAll={toggleSelectAll}
          />
        }
        renderItem={({ item }) => {
          const product = products[item.productId];
          const isSelected = !!selectedItems[item.productId];
          return (
            <CartItem
              product={product}
              item={item}
              isSelected={isSelected}
              toggleSelectItem={toggleSelectItem}
            />
          );
        }}
      />
      <CheckoutButton />
    </SafeAreaView>
  );
};

export default CartScreen;
