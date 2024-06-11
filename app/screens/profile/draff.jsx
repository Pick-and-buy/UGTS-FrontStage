        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', username: '', dateOfBirth: null }}
                    validationSchema={validationSchema}
                    // onSubmit={handleUpdateProfile}
                    onSubmit={() => { }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        values,
                        errors,
                        touched,
                    }) => (
                        <>
                            <View>
                                <Text style={styles.textHeader}>
                                    Cập nhật thông tin hồ sơ của bạn
                                </Text>
                                <Text style={styles.textHeader_1}>
                                    Dữ liệu này sẽ được hiển thị trong hồ sơ tài khoản của bạn
                                </Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "95%" }}>
                                    <View style={styles.view_3}>
                                        <View style={[styles.view_4]}>
                                            <FontAwesome5 name="user-edit" size={24} color={COLORS.primary} />
                                            <TextInput
                                                style={{ marginLeft: 10, flex: 1 }}
                                                placeholder={data?.result?.firstName}
                                                placeholderTextColor='gray'
                                                value={values.firstName}
                                                onChangeText={handleChange('firstName')}
                                                onBlur={handleBlur('firstName')}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.view_3}>
                                        <View style={styles.view_4}>
                                            <FontAwesome5 name="user-edit" size={24} color={COLORS.primary} />
                                            <TextInput
                                                style={{ marginLeft: 10, flex: 1 }}
                                                placeholder={data?.result?.lastName}
                                                placeholderTextColor='gray'
                                                value={values.lastName}
                                                onChangeText={handleChange('lastName')}
                                                onBlur={handleBlur('lastName')}
                                            />
                                        </View>

                                    </View>

                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    {touched.firstName && errors.firstName && (
                                        <Text style={[styles.errorMessage, { flex: 1 }]}>{errors.firstName}</Text>
                                    )}

                                    {touched.lastName && errors.lastName && (
                                        <Text style={[styles.errorMessage, { flex: 1 }]}>{errors.lastName}</Text>
                                    )}
                                </View>
                            </View>
                            <View style={[styles.view_4, { marginTop: 12 }]}>
                                <MaterialCommunityIcons name="account-outline" size={30} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder={data?.result?.username}
                                    placeholderTextColor='gray'
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                />
                            </View>
                            {touched.username && errors.username && (
                                <Text style={styles.errorMessage}>{errors.username}</Text>
                            )}

                            <View style={[styles.view_4, { marginTop: 12 }]}>
                                <MaterialCommunityIcons name="calendar" size={30} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder={data?.result?.dob}
                                    placeholderTextColor='gray'
                                    value={values.dateOfBirth ? values.dateOfBirth.toLocaleDateString() : ''}
                                    onFocus={() => setDatePickerVisibility(true)}
                                    showSoftInputOnFocus={false}
                                />
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={(date) => {
                                        setDatePickerVisibility(false);
                                        setFieldValue('dateOfBirth', date);
                                    }}
                                    onCancel={() => setDatePickerVisibility(false)}
                                />
                            </View>
                            {touched.dateOfBirth && errors.dateOfBirth && (
                                <Text style={styles.errorMessage}>{errors.dateOfBirth}</Text>
                            )}
                            <View style={[styles.view_4, { marginTop: 12 }]}>
                                <MaterialCommunityIcons name="email-outline" size={30} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder={data?.result?.email}
                                    placeholderTextColor='gray'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                            </View>
                            {touched.email && errors.email && (
                                <Text style={styles.errorMessage}>{errors.email}</Text>
                            )}


                            <View>
                                <Button
                                    title={"CẬP NHẬT"}
                                    onPress={handleSubmit}
                                    isValid={true}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </View>